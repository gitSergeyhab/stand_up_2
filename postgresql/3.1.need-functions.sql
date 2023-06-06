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
	EXECUTE 'INSERT INTO views (' || quote_ident(_col) || ', user_watched_id) VALUES (' || idx || ', '|| user_watched_idx ||');';
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
$$ LANGUAGE SQL;s