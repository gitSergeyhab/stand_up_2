import { Query, YearsFromQuery } from "../types";



export const getWhereStatus = (status: Query) => status ? 'LOWER(user_status) = LOWER(:status)' : ''; 

export const getWhereRoles = (role: Query) => role ? 'LOWER(role_name) = LOWER(:role)' : ''; 


export const getWhereYearsBetween = (years: YearsFromQuery | null) => years ? `EXTRACT (YEAR FROM user_date_birth) BETWEEN :year_from AND :year_to` : '';

export const getWhereActivated  = (activated: Query) => activated ? `user_activated = :activated` : '';

export const getWhereCountry = (country_id: Query) =>  country_id ? `country_id = :country_id` : '';

export const collectWhere = (wheres: string[]) => {
    const whereNotEmpty = wheres.filter((item) => item);
    if (whereNotEmpty.length) {
        return ` WHERE ${whereNotEmpty.join(' AND ')} `  
    }
    return '';
}