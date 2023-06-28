import { Router } from 'express'
import { testController } from '../controllers/test-controller';

const testRouter =  Router();

testRouter.get('/secondary', testController.getSecondary);

export { testRouter };