CREATE OR REPLACE FUNCTION get_review_user_data(user_idx bigint, lim int) RETURNS JSON AS $$
	SELECT 
		JSON_AGG(JSON_BUILD_OBJECT(
			'reviewId', review_id,
			'showId', show_id,
			'title', review_title,
			'text', review_text,
			'reviewDate', review_date_updated,
			'showName', show_name,
			'comedianFirstName', comedian_first_name,
			'comedianFirstNameEn', comedian_first_name_en,
			'comedianLastName', comedian_last_name,
			'comedianLastNameEn', comedian_last_name_en
		))
	FROM (
		SELECT 
		review_id, show_id, review_title, review_text, review_date_updated, 
		show_name, 
		comedian_first_name, comedian_first_name_en, comedian_last_name, comedian_last_name_en
		FROM reviews 
		LEFT JOIN shows USING (show_id)
		LEFT JOIN comedians USING (comedian_id)
		WHERE user_id = user_idx 
		ORDER BY review_date_updated DESC 
		LIMIT lim
	) AS rvws
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_show_ratings_user_data(user_idx bigint, lim int) RETURNS JSON AS $$
	SELECT 
		JSON_AGG(JSON_BUILD_OBJECT(
			'showId', show_id,
			'showRate', show_rate,
			'dateRate', show_date_rate,
			'showName', show_name,
			'comedianFirstName', comedian_first_name,
			'comedianFirstNameEn', comedian_first_name_en,
			'comedianLastName', comedian_last_name,
			'comedianLastNameEn', comedian_last_name_en
		))
	FROM (
		SELECT
		show_id, show_rate, show_date_rate,
		show_name, 
		comedian_first_name, comedian_first_name_en, comedian_last_name, comedian_last_name_en
		FROM show_ratings
		LEFT JOIN shows USING (show_id)
		LEFT JOIN comedians USING (comedian_id)
		WHERE user_id = user_idx 
		ORDER BY show_date_rate DESC 
		LIMIT lim
	) AS t
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_comedian_ratings_user_data(user_idx bigint, lim int) RETURNS JSON AS $$
	SELECT 
		JSON_AGG(JSON_BUILD_OBJECT(
			'comedianId', comedian_id,
			'comedianRate', comedian_rate,
			'dateRate', comedian_date_rate, 
			'comedianFirstName', comedian_first_name,
			'comedianFirstNameEn', comedian_first_name_en,
			'comedianLastName', comedian_last_name,
			'comedianLastNameEn', comedian_last_name_en
		))
	FROM (
		SELECT
		comedian_id, comedian_rate, comedian_date_rate,
		comedian_first_name, comedian_first_name_en, comedian_last_name, comedian_last_name_en
		FROM comedian_ratings 
		LEFT JOIN comedians USING (comedian_id)
		WHERE user_id = user_idx 
		ORDER BY comedian_date_rate DESC 
		LIMIT lim
	) AS t
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_latest_views_by_user(user_idx BIGINT)
RETURNS TABLE(view_id BIGINT, view_date TIMESTAMP, type VARCHAR, data_id BIGINT, picture VARCHAR, dist VARCHAR) AS $$
	SELECT view_id, view_date,
	CASE
	   WHEN views.show_id IS NOT NULL THEN 'shows'
	   WHEN views.comedian_id IS NOT NULL THEN 'comedians'
	   WHEN views.event_id IS NOT NULL THEN 'events'
	   WHEN views.place_id IS NOT NULL THEN 'places'
	END AS type,
	CASE
	   WHEN views.show_id IS NOT NULL THEN views.show_id
	   WHEN views.comedian_id IS NOT NULL THEN views.comedian_id
	   WHEN views.event_id IS NOT NULL THEN views.event_id
	   WHEN views.place_id IS NOT NULL THEN views.place_id
	END AS data_id,
	CASE
	   WHEN show_poster IS NOT NULL THEN show_poster
	   WHEN comedian_avatar IS NOT NULL THEN comedian_avatar
	   WHEN event_promo_picture IS NOT NULL THEN event_promo_picture
	   WHEN place_promo_picture IS NOT NULL THEN place_promo_picture
	END AS picture,
	'' || COALESCE(views.show_id, 0) || COALESCE(views.comedian_id, 0) || COALESCE(views.event_id, 0) || COALESCE(views.place_id, 0) AS dist
	FROM views
	LEFT JOIN shows ON shows.show_id = views.show_id
	LEFT JOIN comedians ON comedians.comedian_id = views.comedian_id
	LEFT JOIN events ON events.event_id = views.event_id
	LEFT JOIN places ON places.place_id = views.place_id
	WHERE user_watched_id = user_idx AND views.user_id IS NULL
	ORDER BY view_date DESC;
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_user_views_data(user_idx bigint, lim int) 
RETURNS JSON AS $$
SELECT JSON_AGG(JSON_BUILD_OBJECT(
	'id', view_id,
	'dataId', data_id,
	'viewDate', view_date,
	'picture', picture,
	'type', type
)) FROM (
	SELECT * FROM (
		SELECT DISTINCT ON (dist) dist, view_id, type, data_id, view_date, picture
		FROM get_latest_views_by_user(user_idx) 
		ORDER BY dist, view_date DESC
	) AS d
ORDER BY view_date DESC
LIMIT lim
) AS dor
$$ LANGUAGE SQL;



CREATE OR REPLACE FUNCTION get_resources(_col TEXT, idx BIGINT) 
RETURNS SETOF JSON AS $$
BEGIN
	RETURN QUERY EXECUTE '
	SELECT
	JSON_AGG(JSON_BUILD_OBJECT(''id'', resource_id, ''type'', resource_type_name, ''href'', resource_href))
	FROM resources 
	LEFT JOIN resource_types USING(resource_type_id)
	WHERE ' || quote_ident(_col) || ' = ' || idx ||'
	';
END     
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_pictures(_col TEXT, idx BIGINT)
RETURNS SETOF JSON AS $$
BEGIN
	RETURN QUERY EXECUTE '
	SELECT 
	JSON_AGG(JSON_BUILD_OBJECT(''id'', picture_id, ''src'', picture_path))
	FROM (
		SELECT * FROM pictures 
		WHERE ' ||  quote_ident(_col) || '  = ' ||  idx ||'
		ORDER BY picture_id DESC
	) as t
	';
END     
$$ LANGUAGE plpgsql;




-- ... and videos
CREATE OR REPLACE FUNCTION get_show_videos() 
RETURNS TABLE(show_id bigint, video_paths VARCHAR(256)[], is_pro BOOLEAN[], minutes SMALLINT[], user_ids bigint[], user_niks VARCHAR(32)[]) AS $$
	SELECT
	show_id, 
	ARRAY_AGG(show_video_path) AS video_paths, 
	ARRAY_AGG(show_video_professional ) AS is_pro, 
	ARRAY_AGG(show_minutes) AS minutes,
	ARRAY_AGG(users.user_id) AS user_ids, 
	ARRAY_AGG(users.user_nik) AS user_niks
	FROM show_videos
	LEFT JOIN users USING (user_id)
	GROUP BY show_id
	ORDER BY show_id;
$$ LANGUAGE SQL;



-- INSERT VIEWS


CREATE OR REPLACE FUNCTION insert_view (_col text, idx BIGINT, user_watched_idx BIGINT) 
RETURNS void AS $$
BEGIN
	EXECUTE 'INSERT INTO views (' || quote_ident(_col) || ', user_watched_id) VALUES (' || idx || ', '|| user_watched_idx ||');';
END
$$ LANGUAGE plpgsql;


-- number of views in the last x days


CREATE OR REPLACE FUNCTION get_views_count(_col text, idx bigint, days int) 
RETURNS SETOF bigint AS $$
BEGIN
	RETURN QUERY EXECUTE '
		SELECT COUNT (*) FROM views
		WHERE EXTRACT( DAY FROM (NOW() - view_date) ) < ' || days || ' AND ' || quote_ident(_col) || ' = ' || idx || ';
	';
END
$$ LANGUAGE plpgsql;


-- for event-page
CREATE OR REPLACE FUNCTION get_event_comedians(event_idx INT) RETURNS JSON AS $$
	SELECT 
	JSON_AGG(JSON_BUILD_OBJECT(
		'comedian_id', comedian_id,
		'comedian_first_name', comedian_first_name,
		'comedian_last_name', comedian_last_name,
		'comedian_first_name_en', comedian_first_name_en,
		'comedian_last_name_en', comedian_last_name_en,
		'comedian_avatar', comedian_avatar,
		'avg_comedian_rate', avg_comedian_rate
	)) 
	FROM (
		SELECT 
		comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, comedian_avatar,
		AVG (comedian_rate) as avg_comedian_rate, COUNT (comedian_rate) as num
		FROM events
		LEFT JOIN comedians_events USING (event_id)
		LEFT JOIN comedians USING (comedian_id)
		LEFT JOIN comedian_ratings USING (comedian_id)
		WHERE event_id = event_idx
		GROUP BY event_id, comedian_id, comedian_first_name, comedian_last_name, comedian_first_name_en, comedian_last_name_en, comedian_avatar
		ORDER BY num DESC
		LIMIT 10
	) as e
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_event_shows(event_idx INT) RETURNS JSON AS $$
	SELECT 
	JSON_AGG(JSON_BUILD_OBJECT(
		'show_id', show_id,
		'show_name', show_name,
		'show_poster', show_poster,
		'avg_show_rate', avg_show_rate
	)) 
	FROM (
		SELECT 
		show_id, show_name, show_poster,
		AVG (show_rate) as avg_show_rate, COUNT (show_rate) as num
		FROM events
		JOIN shows USING (event_id)
		LEFT JOIN show_ratings USING (show_id)
		WHERE event_id = event_idx
		GROUP BY show_id, show_name, show_poster
		ORDER BY num DESC
		LIMIT 10
	) as e
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_videos_by_show(idx BIGINT) RETURNS JSON AS $$
	SELECT
	JSON_AGG(JSON_BUILD_OBJECT('id', show_video_id, 'pro', show_video_professional, 'minutes', show_minutes, 'userId', user_id, 'userNik', user_nik, 'path', show_video_path))
	FROM (
		SELECT * 
		FROM show_videos 
		WHERE show_id = 2
		ORDER BY show_video_id DESC
	) AS sv
	LEFT JOIN users USING(user_id);
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_one_name_of_two(first TEXT, second TEXT) RETURNS TEXT AS $$
	SELECT TRIM(COALESCE(first, '') || ' ' || COALESCE(second, ''))
$$ LANGUAGE SQL;