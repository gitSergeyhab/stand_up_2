class SQLQueryCardService {
    getShows(type='show') {
        return `
            SELECT 
                '${type}' AS type,
                shows.show_id, 
                show_name, 
                show_date,
                show_date_added,
                COALESCE(show_date, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS show_date_sort, 
                destination || filename AS main_picture,
                comedians.comedian_id, 
                comedian_nik,
                get_user_show_rating(shows.show_id, :user_id) AS user_rating,
                get_views_count('show_id', shows.show_id, 7) AS weekly_views,
                get_views_count('show_id', shows.show_id, 1000000) AS total_views,
                get_show_avg_rate(shows.show_id) AS avg_rate,
                get_show_count_rate(shows.show_id) AS number_of_rate
            FROM shows
            LEFT JOIN comedians ON comedians.comedian_id = shows.comedian_id
            LEFT JOIN main_pictures ON show_main_picture_id = main_picture_id
        `;
    }

    getComedians(type='comedian') {
        return `
            SELECT 
                '${type}' AS type,
                comedian_id, 
                comedian_nik,
                destination || filename AS main_picture,
                COALESCE(comedian_date_birth, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS comedian_date_sort, 
                country_id, 
                country_name, 
                comedian_city,
                get_views_count('comedian_id', comedian_id, 7) AS weekly_views,
                get_views_count('comedian_id', comedian_id, 1000000) AS total_views
            FROM comedians
            LEFT JOIN countries USING(country_id)
            LEFT JOIN main_pictures ON comedian_main_picture_id = main_picture_id
        `
    }

    getEvents (type='event') {
        return `
            SELECT 
                '${type}' AS type,
                events.event_id, 
                event_name,
                event_name_en, 
                event_date, 
                COALESCE(event_date, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS event_date_sort,
                event_date_added,
                event_status,
                places.place_id, 
                place_name,
                destination || filename AS main_picture,
                get_views_count('event_id', events.event_id, 7) AS weekly_views,
                get_views_count('event_id', events.event_id, 1000000) AS total_views
            FROM events
            LEFT JOIN main_pictures ON event_main_picture_id = main_picture_id
            LEFT JOIN places ON events.place_id = places.place_id
            LEFT JOIN comedians_events ON comedians_events.event_id = events.event_id
            LEFT JOIN comedians ON comedians.comedian_id = comedians_events.comedian_id
        `
    }

    getPlaces(type='place') {
        return `
            SELECT
                '${type}' AS type,
                place_id,
                place_name,
                place_city, 
                place_city_en,
                place_date_founded, 
                COALESCE(place_date_founded, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS place_date_founded_sort, 
                countries.country_id, 
                country_name, 
                destination || filename AS main_picture,
                get_views_count('place_id', place_id, 7) AS weekly_views,
                get_views_count('place_id', place_id, 1000000) AS total_views
            FROM places
            LEFT JOIN countries ON countries.country_id = places.country_id
            LEFT JOIN main_pictures ON place_main_picture_id = main_pictures.main_picture_id
        `;
    }
    getNews(type='news') {
        return `
        SELECT 
            '${type}' AS type,
            news.news_id, 
            news_title, 
            news_text,
            destination || filename AS main_picture,
            date_added,
            date_updated,
            COALESCE(date_added, TO_DATE('0100-01-01', 'YYYY-MM-DD')) AS news_date_sort, 
            users.user_id, 
            user_nik,
            get_views_count('news_id', news.news_id, 7) AS weekly_views,
            get_views_count('news_id', news.news_id, 1000000) AS total_views
        FROM news
        LEFT JOIN users ON users.user_id = news.user_added_id
        LEFT JOIN main_pictures ON news_main_picture_id = main_pictures.main_picture_id
        `;
    }

    getNewsComments(type='news_comments') {
        return `
        SELECT 
            '${type}' AS type,
            comment_id,
            root_comment_id,
            news_comments.date_added,
            news_comments.date_updated,
            users.user_id,
            user_nik,
            news.news_id,
            news_title,
            text,
            get_comments_by_root(comment_id) AS child_comments,
            get_count_children_comments(comment_id) AS child_comment_count
        FROM news_comments
        LEFT JOIN users ON news_comments.user_added_id = users.user_id
        LEFT JOIN news ON news_comments.news_id = news.news_id
        `;
    }
}


export const sqlQueryCardService = new SQLQueryCardService();