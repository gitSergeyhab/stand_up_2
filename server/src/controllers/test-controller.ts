import { Request, Response } from "express";
import { StatusCode } from "../const/const";

import axios from "axios";

export interface SecondaryJet {
    status:      string;
    data:        Datum[];
    total:       number;
    aggregation: Aggregation;
}

export interface Aggregation {
}

export interface Datum {
    company:                  string;
    image_url:                string;
    preview_small_url:        null | string;
    preview_url:              null | string;
    loan_id:                  number;
    loan_class:               number;
    loan_isin:                string;
    loan_name:                string;
    loan_order:               number;
    term:                     number;
    term_left:                number;
    interest_rate:            number;
    rating:                   Rating;
    status:                   Status;
    borrower_type:            BorrowerType | null;
    end_date:                 Date;
    progress:                 number;
    amount:                   number | null;
    principal_debt:           number | null;
    ytm:                      number | null;
    min_price:                number | null;
    invested_contracts_count: number | null;
    invested_debt:            number | null;
    invested_company_debt:    number | null;
}

export enum BorrowerType {
    Bronze = "bronze",
}

export enum Rating {
    A = "A+",
    AAA = "AAA",
    Aa = "AA",
    B = "B",
    Bb = "BB+",
    Bbb = "BBB",
    C = "C",
    Cc = "CC",
    Ccc = "CCC",
    RatingA = "A",
    RatingAA = "AA+",
    RatingAAA = "AAA+",
    RatingB = "B+",
    RatingBB = "BB",
    RatingBBB = "BBB+",
    RatingC = "C+",
    RatingCC = "CC+",
    RatingCCC = "CCC+",
}

export enum Status {
    Active = "active",
    Restructured = "restructured",
}



class TestController {
    async getSecondary(req: Request, res: Response) {

        try {

            console.log('TestController ________________ getSecondary')
            const {data} = await axios.get<SecondaryJet>('https://jetlend.ru/invest/api/exchange/loans', {
                headers: {
                    Cookie: '_jl_uid=UsroUmL9AMlRndzEB62mAg==; _ga=GA1.2.1886077997.1660747983; referrer=https://yandex.ru/; click_id=; _ym_uid=1660747983378396244; _tt_enable_cookie=1; _ttp=3e393c29-9b21-4c08-a625-129bd0c49b29; tmr_lvid=f174aab0f5b1e8bff9e37ecdf191994c; tmr_lvidTS=1660747983070; _ym_d=1679500623; tildauid=1680190551703.383116; utm_source=yandex; utm_medium=cpc; MgidSensorNVis=1; MgidSensorHref=https://jetlend.ru/invest/v3/market; utm_campaign=79589442; utm_content=12914576875; _gid=GA1.2.60113496.1683137972; utm_term=Ð´Ð¶ÐµÑ‚Ð»ÑÐ½Ð´; _fbp=fb.1.1683178574327.407988886; csrftoken=djSTMurzqaXFp1pVI2GuEde5b8XdvqTN; sessionid=foeovz0nh447un6u16w6wvu1oa3uogkn; _gcl_au=1.1.143259238.1687344756; _ym_isad=1; _ym_visorc=w; tmr_detect=1|1687892277292'
                }
            });
            res.status(StatusCode.Ok).json(data)
            
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'TestController'})
        }
    }
}


export const testController = new TestController()