import { ParsedQs } from 'qs';
import { Role } from './const/const';
import { Request } from 'express';

export type TitlesDataType = {native: string, en: string | null}

export type RateResult = {
    count?: string;
    rate?: number;
    rate_count?: string;
    rate_id?: string;
    date?: string;
    user_id?: string;
    user_nik?: string;
    user_avatar?: string;
    en?: string
    native?: string
}

export type DataTypeRate = {
    count: string;
    stats: RateResult[];
    rates: RateResult[];
    titles: RateResult;
}

export type UserDTO_SC = {
    user_id: string,
    user_email: string,
    user_activated: boolean,
}

export type UserDTO_CC = {
    userId: string,
    userEmail: string,
    userActivated: boolean,
}

export type UserPseudoType = {
    user_email: string,
    user_password: string,
    user_avatar: string,
    user_id: string,
    user_nik: string,
    user_activated: boolean,
    roles: Role[]
}

export type YearsFromQuery = {
    yearFrom: number;
    yearTo: number;
}


export type Query = string | ParsedQs | string[] | ParsedQs[];

export type ImageFile = {
    filename: string,
    destination: string,
    mimetype: string,
    size: number
}

export type SimpleDict = {[key: string]:string}


export type UserRequest = Request & {user: UserPseudoType}


export type EmptyMessageFromClient = {
    userId: string;
    roomId: string;
}

type FileData = {
    file: File,
    type: string,
    size: number,
    name: string
  }

export type MessageFromClient = EmptyMessageFromClient & {
    text: string;
    fileData?: FileData;
    quoteId?: string; 
};


export type MessageFromDB = {
    message_id: string, 
    user_id: string, 
    user_nik: string, 
    room_id: string, 
    message_text?: string,  
    message_auto?: boolean, 
    message_added: Date,
    avatar?: string,
    image?: string,
    user_roles: Role[];

    quote_id?: string,
    quote_user_id?: string,
    quote_user_nik?: string,
    quote_text?: string,
    quote_added?: Date,
    quote_image?: string;
}


export type RoomUserId = {
    room_id: string;
    user_id: string
}

