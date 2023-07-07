import { Router } from 'express'
import { chatController } from '../controllers/chat-controller';
import { asyncHandler } from '../middlewares/async-handler';

const chatRouter =  Router();

chatRouter.get('/rooms', asyncHandler(chatController.getRooms));

export { chatRouter };