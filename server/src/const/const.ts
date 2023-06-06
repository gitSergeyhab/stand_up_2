export const enum StatusCode {
    ServerError = 500,
    NotFoundError = 404,
    BadRequest = 400,
    NotAuthError = 401,
    Ok = 200,
    Added = 201,
    Deleted = 204,
}


export const OrderValues = {
    dateAdded: 'date_added',
    dateWas: 'show_date',
    rate: 'avg_rate',
    pop: 'number_of_rate',
    views: 'views',
    totalViews: 'total_views'
}


export const enum SQLFunctionName {
    InsertComedianView = 'insert_comedian_view',
    InsertShowView = 'insert_show_view',
    InsertPlaceView = 'insert_place_view',
    InsertEventView = 'insert_event_view',
}

export const enum Column {
    Comedian = 'comedian_id',
    Show = 'show_id',
    Place = 'place_id',
    Event = 'event_id',
    User = 'user_id'
}

export const TableName = {
    comedians: 'comedians',
    shows: 'shows',
    places: 'places',
    events: 'events',
    users: 'users',
    images: 'images'
}


export const ColumnId = {
    comedians: 'comedian_id',
    shows: 'show_id',
    places: 'place_id',
    events: 'event_id',
    users: 'user_id'
}

export const JoiMessageKey = {
    StringMin: `string.min`,
    StringMax: `string.max`,
    StringEmpty: `string.empty`,
    Required: `any.required`,
    AnyOnly: `any.only`,
    NumberMin: `number.min`,
    NumberBase: `number.base`,
    Regexp: `string.pattern.base`,
    Email: `string.email`
  };

  export const EventStatus = {
    Planned: 'planned',
    Ended: 'ended',
    Canceled: 'canceled',
    All: 'all'
  } as const;

  export const DefaultQueryParams = {
    Limit: 6,
    Offset: 0, 
    EventStatusAll: EventStatus.All,
  }

  export const TokenExpire = {
    Access: '30m',
    Refresh: '30d'
    // Access: '10s',
    // Refresh: '20s'
  }

  export const enum TokenType {
    Refresh = 'REFRESH',
    Access = 'ACCESS'
}

export const enum BooleanStr {
  True = 'true',
  False = 'false'
}


export const enum Role {
  Super = 'SUPER',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
  ProUser = 'PRO-USER'
}

export const  ImageType = {
  images: 'images',
  avatars: 'avatars',
  main_pictures: 'main_pictures',
} as const;


export const FilterYear = {
  From: 1800,
}