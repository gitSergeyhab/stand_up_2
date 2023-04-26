CREATE OR REPLACE FUNCTION insert_view (_col text, idx BIGINT, user_wached_idx BIGINT) 
RETURNS void AS $$
BEGIN
	EXECUTE 'INSERT INTO views (' || quote_ident(_col) || ', user_wached_id) VALUES (' || idx || ', '|| user_wached_idx ||');';
END
$$ LANGUAGE plpgsql;

select insert_view('comedian_id', 4, 2);
select insert_view('show_id', 2, 4);
select insert_view('event_id', 3, 4);
select insert_view('user_id', 2, 1);
select insert_view('place_id', 4, 2);

CREATE TABLE views (
    view_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),
    show_id BIGINT REFERENCES shows(show_id),
    place_id BIGINT REFERENCES places(place_id),
    comedian_id BIGINT REFERENCES comedians(comedian_id),
    event_id BIGINT REFERENCES events(event_id),
    user_wached_id BIGINT REFERENCES users(user_id),

    view_date TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP
)


select * from views ORDER BY view_date DESC;

select * from  get_user_views_data(1, 4)

-- "view_id" : 70, "view_date" : "2022-10-26T13:36:49.255985", "picture" : "/avatars/comedian/comedian_avatar/d-romanov.jpeg", "type" : "comedians"

CREATE OR REPLACE FUNCTION get_latest_views_by_user(user_idx BIGINT, lim INT)
RETURNS TABLE(
	view_id BIGINT, user_id BIGINT, show_id BIGINT, place_id BIGINT, comedian_id BIGINT, event_id BIGINT, user_wached_id BIGINT, view_date TIMESTAMP
) AS $$
	SELECT *
	FROM views
	WHERE user_wached_id = user_idx AND user_id IS NULL
	ORDER BY view_date DESC
	LIMIT lim
$$ LANGUAGE SQL;

SELECT * FROM get_latest_views_by_user(1, 10)




WHERE show_id IS NOT NULL

-- view_id, place_id AS date_id, view_date, place_promo_picture AS picture, 'places' AS type
DROP FUNCTION get_latest_views_by_user(user_idx BIGINT)


CREATE OR REPLACE FUNCTION get_latest_views_by_user(user_idx BIGINT)
RETURNS TABLE(view_id BIGINT, view_date TIMESTAMP, type VARCHAR, date_id BIGINT, dist VARCHAR) AS $$
	SELECT view_id, view_date, 
	CASE
	   WHEN show_id IS NOT NULL THEN 'shows'
	   WHEN comedian_id IS NOT NULL THEN 'comedians'
	   WHEN event_id IS NOT NULL THEN 'events'
	   WHEN place_id IS NOT NULL THEN 'places'
	END AS type,
	CASE
	   WHEN show_id IS NOT NULL THEN show_id
	   WHEN comedian_id IS NOT NULL THEN comedian_id
	   WHEN event_id IS NOT NULL THEN event_id
	   WHEN place_id IS NOT NULL THEN place_id
	END AS date_id,
	'' || COALESCE(show_id, 0) || COALESCE(comedian_id, 0) || COALESCE(event_id, 0) || COALESCE(place_id, 0) AS dist
	FROM views
	WHERE user_wached_id = user_idx AND user_id IS NULL
	ORDER BY view_date DESC;
$$ LANGUAGE SQL;

select * from get_latest_views_by_user(4) WHERE type = 'places'


SELECT * FROM (
	SELECT DISTINCT ON (dist) dist, view_id, type, date_id, view_date
	from get_latest_views_by_user(4) 
	ORDER BY dist, view_date
) as d
ORDER BY view_date DESC
