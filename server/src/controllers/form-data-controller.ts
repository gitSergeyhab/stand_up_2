import { Request, Response } from "express";
import { sequelize } from "../sequelize";
import { StatusCode } from "../const/const";
import { ApiError } from "../custom-errors/api-error";


class FormDataController {
    async getPreloadForm(req: Request, res: Response) {
        try {
            const result = await sequelize.query(
                `
                SELECT
                country_id, country_name
                FROM countries;

                SELECT
                comedian_id, comedian_nik 
                FROM comedians;

                SELECT
                show_id, show_name
                FROM shows;

                SELECT
                event_id, event_name
                FROM events;

                SELECT
                place_id, place_name
                FROM places;

                SELECT
                language_id, language_name
                FROM languages;
                `
            );

            type FormDataType = { 
                country_id?: string,  
                comedian_id?: string, 
                show_id?: string, 
                event_id?: string, 
                place_id?: string, 
                language_id?: string
            }
            const data = result[0] as FormDataType[];

            const countries = data.filter((item) => item.country_id);
            const comedians = data.filter((item) => item.comedian_id);
            const shows = data.filter((item) => item.show_id);
            const events = data.filter((item) => item.event_id);
            const places = data.filter((item) => item.place_id);
            const languages = data.filter((item) => item.language_id);

            return res.status(StatusCode.Ok).json({
                countries, comedians, events, shows, places, languages
            })

        } catch (err) {
            console.log({err}, '___________________________________')
            throw new ApiError(StatusCode.ServerError, 'Error getPreloadForm')
            
        }
    }

    async getPreloadCountries(req: Request, res: Response) {
        try {
            const result = await sequelize.query(
                `
                SELECT
                country_id, country_name
                FROM countries;
                `, { type: 'SELECT' }
            );

            return res.status(StatusCode.Ok).json(result)

        } catch (err) {
            console.log({err}, '___________________________________')
            throw new ApiError(StatusCode.ServerError, 'Error getPreloadCountries')
            
        }
    }

    
    async getPreloadPlaces(req: Request, res: Response) {
        try {
            const result = await sequelize.query(
                `
                SELECT
                place_id, place_name
                FROM places;
                `, { type: 'SELECT' }
            );

            return res.status(StatusCode.Ok).json(result)

        } catch (err) {
            console.log({err}, '___________________________________')
            throw new ApiError(StatusCode.ServerError, 'Error getPreloadPlaces')
            
        }
    }
}


export const formDataController = new FormDataController()