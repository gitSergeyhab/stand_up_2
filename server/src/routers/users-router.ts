import {Router} from 'express'
import { Role } from '../const';
import { userController } from '../controllers/users-controller';
import { asyncHandler } from '../middlewares/async-handler';
import { authMiddleware } from '../middlewares/auth-middleware';
import { rolesMiddleware } from '../middlewares/roles-middleware';
import { userValidate } from '../middlewares/user-validate';

const userRouter =  Router();

userRouter.get('/refresh', asyncHandler(userController.refreshToken));


// userRouter.get('/', rolesMiddleware([Role.Admin, Role.Moderator, Role.Super]), asyncHandler(userController.getUsersByQueries));
userRouter.get('/', authMiddleware, asyncHandler(userController.getUsersByQueries));      


userRouter.get('/:id', userController.getUserById);

userRouter.post('/registration', userValidate, asyncHandler(userController.registration));
userRouter.post('/login', asyncHandler(userController.login));
userRouter.post('/logout', asyncHandler(userController.logout));

userRouter.get('/activate/:link', asyncHandler(userController.activate));
userRouter.get('/refresh', asyncHandler(userController.refreshToken))



export {userRouter};