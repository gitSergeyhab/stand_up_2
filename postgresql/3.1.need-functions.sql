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
