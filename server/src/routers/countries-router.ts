import { Router } from 'express';
import { countriesController } from '../controllers/countries-controller';

const countriesRouter = Router();

countriesRouter.get('/', countriesController.getPopularCountry);
countriesRouter.get('/:sign', countriesController.getPopularCountryBySign);


export {countriesRouter}
