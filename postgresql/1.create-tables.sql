CREATE TABLE languages (
    language_id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    language_name VARCHAR(64),
    language_name_en VARCHAR(64)
);

CREATE TABLE countries ( 
    country_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_name VARCHAR(64),
    country_name_en VARCHAR(64)
    );


CREATE TABLE users ( 
    user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id INTEGER REFERENCES countries(country_id),

    user_email VARCHAR(128) UNIQUE,
    user_password VARCHAR(512) NOT NULL,
    user_nik VARCHAR(64) UNIQUE,
    user_first_name VARCHAR(64),
    user_last_name VARCHAR(64),
    user_city VARCHAR(256),
    user_avatar VARCHAR(128),
    user_date_birth DATE,
    user_description TEXT,
    user_date_registration DATE DEFAULT CURRENT_DATE,
    user_activated BOOLEAN DEFAULT FALSE,
    user_activation_link VARCHAR(128)
    );

CREATE TABLE tokens (
    token_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),
    refresh_token VARCHAR(512) NOT NULL
);

CREATE TABLE comedians ( 
    comedian_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id INTEGER REFERENCES countries(country_id),
    user_added_id BIGINT REFERENCES users(user_id),

    comedian_first_name VARCHAR(64) NOT NULL,
    comedian_last_name VARCHAR(64),
    comedian_first_name_en VARCHAR(64),
    comedian_last_name_en VARCHAR(64),
    comedian_city VARCHAR(256),
    comedian_city_en VARCHAR(256),
    comedian_avatar VARCHAR(128),
    comedian_date_birth DATE,
    comedian_date_death DATE,
    comedian_description TEXT,
    comedian_date_added DATE DEFAULT CURRENT_DATE
    );

CREATE TABLE places ( 
    place_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id INTEGER REFERENCES countries(country_id),
    user_added_id BIGINT REFERENCES users(user_id),

    place_name VARCHAR(256),
    place_name_en VARCHAR(256),
    place_city VARCHAR(256),
    place_city_en VARCHAR(256),
    place_date_founded DATE,
    place_description TEXT,
    place_promo_picture VARCHAR(256),
    place_date_added DATE DEFAULT CURRENT_DATE,
    place_active BOOLEAN DEFAULT TRUE
    );


CREATE TABLE events (
    event_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    place_id BIGINT REFERENCES places(place_id),
    user_id BIGINT REFERENCES users(user_id),

    event_name VARCHAR(512) NOT NULL,
    event_name_en VARCHAR(512),
    event_description TEXT,
    event_date DATE,
    event_date_added DATE DEFAULT CURRENT_DATE,
    event_status VARCHAR(32) DEFAULT 'COMPLETED',
    event_promo_picture VARCHAR(256)
);


CREATE TABLE comedians_events (
    comedian_id BIGINT REFERENCES comedians(comedian_id),
    event_id BIGINT REFERENCES events(event_id),

    CONSTRAINT comedians_events_pkey PRIMARY KEY (comedian_id, event_id)
);


CREATE TABLE shows ( 
    show_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_id BIGINT REFERENCES events(event_id),
    user_added_id BIGINT REFERENCES users(user_id),
    comedian_id BIGINT NOT NULL REFERENCES comedians(comedian_id),
    country_id INTEGER REFERENCES countries(country_id),
    language_id INTEGER NOT NULL REFERENCES languages(language_id),
    place_id BIGINT REFERENCES places(place_id),

    show_date DATE,
    show_name VARCHAR(256),
    show_description TEXT,
    show_poster VARCHAR(256),
    show_date_added DATE DEFAULT CURRENT_DATE
    );

CREATE TABLE show_videos (
    show_video_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    show_id BIGINT REFERENCES shows(show_id) NOT NULL,
    user_id BIGINT REFERENCES users(user_id),

    show_video_path VARCHAR(256),
    show_video_professional BOOLEAN DEFAULT FALSE,
    show_minutes SMALLINT
);



CREATE TABLE reviews ( 
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    user_id BIGINT NOT NULL REFERENCES users(user_id),

    show_id BIGINT REFERENCES shows(show_id),
    event_id BIGINT REFERENCES events(event_id),
    place_id BIGINT REFERENCES places(place_id),

    review_title VARCHAR(256),
    review_text TEXT,
    review_date_added TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    review_date_updated TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE tag_names (
    tag_name_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),

    tag_name VARCHAR(32) NOT NULL,
    tag_name_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE tags ( 
    tag_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tag_name_id BIGINT NOT NULL REFERENCES tag_names(tag_name_id),
    tag_user_id BIGINT REFERENCES users(user_id),

    tag_date DATE DEFAULT CURRENT_DATE
    );

CREATE TABLE comedian_ratings ( 
    comedian_rating_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    comedian_id BIGINT NOT NULL REFERENCES comedians(comedian_id),

    comedian_rate SMALLINT CHECK (comedian_rate > 0 AND 11 > comedian_rate),
    comedian_date_rate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, comedian_id)
    );

CREATE TABLE show_ratings ( 
    show_rating_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    show_id BIGINT NOT NULL REFERENCES shows(show_id),

    show_rate SMALLINT CHECK (show_rate > 0 AND 11 > show_rate),
    show_date_rate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, show_id)
    );

CREATE TABLE resource_types (
    resource_type_id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    resource_type_name VARCHAR(32) DEFAULT 'WEB_SITE'
);

CREATE TABLE pictures (
    picture_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT REFERENCES users(user_id),
    comedian_id BIGINT REFERENCES comedians(comedian_id),
    place_id BIGINT REFERENCES places(place_id),
    show_id BIGINT REFERENCES shows(show_id),
    event_id BIGINT REFERENCES events(event_id),

    picture_path VARCHAR(256) NOT NULL,
    user_added_id BIGINT
);

CREATE TABLE resources (
    resource_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    resource_type_id SMALLINT NOT NULL REFERENCES resource_types(resource_type_id),
    user_id BIGINT REFERENCES users(user_id),
    comedian_id  BIGINT REFERENCES comedians(comedian_id),
    place_id BIGINT REFERENCES places(place_id),
    event_id BIGINT REFERENCES events(event_id),

    resource_href VARCHAR(256) NOT NULL
);


CREATE TABLE views (
    view_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),
    show_id BIGINT REFERENCES shows(show_id),
    place_id BIGINT REFERENCES places(place_id),
    comedian_id BIGINT REFERENCES comedians(comedian_id),
    event_id BIGINT REFERENCES events(event_id),
    user_watched_id BIGINT REFERENCES users(user_id),

    view_date TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    role_id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_name VARCHAR(64)
);

CREATE TABLE users_roles (
    user_id BIGINT REFERENCES users(user_id),
    role_id SMALLINT REFERENCES roles(role_id),

    CONSTRAINT users_roles_pkey PRIMARY KEY (user_id, role_id)
);


