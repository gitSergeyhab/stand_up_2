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

CREATE OR REPLACE FUNCTION get_images(_col TEXT, idx BIGINT)
RETURNS SETOF JSON AS $$
BEGIN
	RETURN QUERY EXECUTE '
	SELECT 
	JSON_AGG(JSON_BUILD_OBJECT(''image_id'', image_id, ''image_path'', destination || filename))
	FROM (
		SELECT * FROM images 
		WHERE ' ||  quote_ident(_col) || '  = ' ||  idx ||'
		ORDER BY image_id DESC
	) as t
	';
END     
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_view (_col text, idx BIGINT, user_watched_idx BIGINT) 
RETURNS void AS $$
BEGIN
   IF (user_watched_idx = 0) THEN
      EXECUTE 'INSERT INTO views (' || quote_ident(_col) || ') VALUES (' || idx || ');';
   ELSE
      EXECUTE 'INSERT INTO views (' || quote_ident(_col) || ', user_watched_id) VALUES (' || idx || ', '|| user_watched_idx ||');';
   END IF;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_views_count(_col text, idx bigint, days int) 
RETURNS SETOF bigint AS $$
BEGIN
	RETURN QUERY EXECUTE '
		SELECT COUNT (*) FROM views
		WHERE EXTRACT( DAY FROM (NOW() - view_date) ) < ' || days || ' AND ' || quote_ident(_col) || ' = ' || idx || ';
	';
END
$$ LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION get_main_pictures(idx bigint) 
RETURNS TEXT AS $$
	SELECT
	destination || filename 
	FROM main_pictures
	WHERE main_picture_id = idx
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_avg_show_rate(show_idx BIGINT) RETURNS SETOF NUMERIC AS $$
	SELECT
	AVG(show_rate) AS avg_show_rate
	FROM show_ratings
	WHERE show_id = show_idx
	GROUP BY show_id 
$$ LANGUAGE SQL;



CREATE OR REPLACE FUNCTION get_reviews_by_type_id_user(_col TEXT, idx BIGINT, user_idx BIGINT) RETURNS TABLE(
	review_id BIGINT, 
	user_id BIGINT,
	show_id BIGINT, 
	event_id BIGINT, 
	place_id BIGINT, 
	review_title VARCHAR, 
	review_text TEXT, 
	review_date_added TIMESTAMP with time zone,
	review_date_updated TIMESTAMP with time zone
) AS $$
BEGIN
	RETURN QUERY EXECUTE '
	SELECT 
	review_id, user_id, show_id, event_id, place_id, review_title, review_text, review_date_added, review_date_updated
	FROM reviews
	WHERE ' || quote_ident(_col) || ' = ' || idx ||'
	AND user_id = ' || user_idx ||'
	';
END     
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_reviews_by_type_id_user(_col TEXT, idx BIGINT, user_idx BIGINT)
RETURNS SETOF JSON AS $$
BEGIN
	RETURN QUERY EXECUTE '
	SELECT
	JSON_AGG(JSON_BUILD_OBJECT(
		''review_id'', review_id, 
		''user_id'', user_id, 
		''show_id'', show_id,
		''event_id'', event_id, 
		''place_id'', place_id
	))
	FROM reviews
	WHERE ' || quote_ident(_col) || ' = ' || idx ||'
	AND user_id = ' || user_idx ||'
	';
END     
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_show_rating(show_idx BIGINT, user_idx BIGINT)
RETURNS JSON AS $$
	SELECT
	JSON_BUILD_OBJECT(
		'show_rating_id', show_rating_id, 
		'show_rate', show_rate
	)
	FROM show_ratings
	WHERE user_id = user_idx 
	AND show_id = show_idx;  
$$ LANGUAGE SQL;
