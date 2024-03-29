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



-- CREATE OR REPLACE FUNCTION get_reviews_by_type_id_user(_col TEXT, idx BIGINT, user_idx BIGINT) RETURNS TABLE(
-- 	review_id BIGINT, 
-- 	user_id BIGINT,
-- 	show_id BIGINT, 
-- 	event_id BIGINT, 
-- 	place_id BIGINT, 
-- 	review_title VARCHAR, 
-- 	review_text TEXT, 
-- 	review_date_added TIMESTAMP with time zone,
-- 	review_date_updated TIMESTAMP with time zone
-- ) AS $$
-- BEGIN
-- 	RETURN QUERY EXECUTE '
-- 	SELECT 
-- 	review_id, user_id, show_id, event_id, place_id, review_title, review_text, review_date_added, review_date_updated
-- 	FROM reviews
-- 	WHERE ' || quote_ident(_col) || ' = ' || idx ||'
-- 	AND user_id = ' || user_idx ||'
-- 	';
-- END     
-- $$ LANGUAGE plpgsql;


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

CREATE OR REPLACE FUNCTION get_show_avg_rate (idx BIGINT) RETURNS numeric AS $$
	SELECT 
	COALESCE(AVG(show_rate), 0) 
	FROM show_ratings
	WHERE show_id = idx
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_show_count_rate (idx BIGINT) RETURNS bigint AS $$
	SELECT COUNT(show_rating_id)
	FROM show_ratings
	WHERE show_id = idx
$$ LANGUAGE SQL;



CREATE OR REPLACE FUNCTION get_count_children_comments (idx BIGINT) RETURNS bigint AS $$
	SELECT COUNT (comment_id)
	FROM news_comments
	WHERE root_comment_id = idx
	GROUP BY (root_comment_id)
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_parent_comment(idx BIGINT) RETURNS JSON AS $$
	SELECT
		JSON_BUILD_OBJECT(
			'comment_id', comment_id,
			'user_id', user_id, 
			'user_nik', user_nik
		)
	FROM (
		SELECT 
			comment_id, 
			user_id, 
			user_nik
		FROM news_comments 
		LEFT JOIN users ON users.user_id = news_comments.user_added_id
		WHERE comment_id = idx
	) as c
	;
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_comment_likes(comment_idx BIGINT, user_idx BIGINT) RETURNS JSON AS $$
	SELECT
		JSON_BUILD_OBJECT(
			'like_count', like_count,
			'dislike_count', dislike_count,
			'like_id', like_id,
			'user_value', user_value
		)
	FROM (
		SELECT 
		COUNT (like_id) FILTER(WHERE VALUE > 0) AS like_count,
		COUNT (like_id) FILTER(WHERE VALUE < 0) AS dislike_count,
		SUM (value) FILTER(WHERE user_added_id = user_idx) AS user_value,
		SUM (like_id) FILTER(WHERE user_added_id = user_idx) as like_id
		FROM news_comment_likes 
		WHERE comment_id = comment_idx
	) AS c
	;
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_comments_by_root(comment_idx BIGINT, user_idx BIGINT) RETURNS JSON AS $$
	SELECT
	JSON_AGG(JSON_BUILD_OBJECT(
		'news_id', news_id,
		'comment_id', comment_id, 
		'root_comment_id', root_comment_id,
		'user_id', user_id, 
		'user_nik', user_nik, 
		'text', text, 
		'date_added', date_added,
		'date_updated', date_updated,
		'avatar', avatar,
		'image', image, 
		'parent_comment', parent_comment,
		'deleted', deleted, 
		'likes', likes
	))
	FROM (
		SELECT 
			news_id,
			comment_id, 
			root_comment_id, 
			text, 
			date_added, 
			date_updated,
			users.user_id, 
			user_nik,
			deleted,
			avatars.destination || avatars.filename AS avatar,
         	images.destination || images.filename AS image,
			get_parent_comment(parent_comment_id) AS parent_comment,
			get_comment_likes(comment_id, user_idx) AS likes
		FROM news_comments 
		LEFT JOIN users ON users.user_id = news_comments.user_added_id
		LEFT JOIN avatars ON users.user_avatar_id = avatars.avatar_id
        LEFT JOIN images ON images.image_id = news_comments.image_id
		WHERE root_comment_id = comment_idx
		ORDER BY comment_id
	) AS c
	;
$$ LANGUAGE SQL;


