import { sequelize } from "../sequelize";
import { Request, Response } from "express";
import { StatusCode } from "../const";

const DEFAULT_COUNTRY_LIMIT = null;

class CountriesController {
    async getPopularCountry (req: Request, res: Response) {

        try {
            const {limit = DEFAULT_COUNTRY_LIMIT} = req.query;

            const result = await sequelize.query(
                `
                SELECT COUNT(country_id), country_id, country_name, country_name_en 
				FROM countries
                INNER JOIN comedians USING(country_id) 
                GROUP BY country_id
                ORDER BY count DESC
                LIMIT :limit
                ;
                SELECT COUNT(country_id) FROM countries;
                `,
                {
                    replacements: {limit},
                    type: 'SELECT'
                }
            )

            return res.status(StatusCode.Ok).json(result)
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get pop countries'})
        }    
    }

    async getPopularCountryBySign (req: Request, res: Response) {

        try {
            const {sign = ''} = req.params;

            const result = await sequelize.query(
                `
                SELECT country_id, country_name, country_name_en FROM countries
                WHERE country_name ILIKE :sign
                OR country_name_en ILIKE :sign
                ;
                `,
                {
                    replacements: {sign: `${sign}%`},
                    type: 'SELECT'
                }
            )

            return res.status(StatusCode.Ok).json(result)
        } catch {
            return res.status(StatusCode.ServerError).json({message: 'error get pop countries'})
        }    
    }
}

export const countriesController = new CountriesController();