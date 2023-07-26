import { Router } from 'express';
import { comedianRouter } from './comedians-router';
import { countriesRouter } from './countries-router';
import { eventsRouter } from './events-router';
import { pictureRouter } from './pictures-router';
import { placesRouter } from './places-router';
import { showsRouter } from './shows-router';
import { subRouter } from './sub-routers';
import { userRouter } from './users-router';
import { imagesRouter } from './images-router';
import { formDataRouter } from './form-data-router';
import { testRouter } from './test-router';
import { chatRouter } from './chat-router';
import { mainRouter } from './main-router';
import { newsRouter } from './news-router';

const router =  Router();

router.use('/users', userRouter);
router.use('/main', mainRouter)
router.use('/comedians', comedianRouter);
router.use('/countries', countriesRouter);
router.use('/shows', showsRouter);
router.use('/places', placesRouter);
router.use('/events', eventsRouter);
router.use('/news', newsRouter);
router.use('/pictures', pictureRouter);
router.use('/images', imagesRouter);
router.use('/form-data', formDataRouter);
router.use('/chat', chatRouter);
router.use('/test', testRouter);

router.use('/sub', subRouter)







export { router };