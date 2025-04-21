import express from 'express';
import { userController } from "../controller/userController.js";
import { isAdmin, verifyToken } from '../middleware/auth.js';

const authRoute = express.Router();
const UserController = new userController;

authRoute.post('/register',verifyToken,isAdmin, UserController.register);
authRoute.post('/login', UserController.login);
authRoute.get('/',verifyToken,isAdmin, UserController.userIndex);
authRoute.put('/:id',verifyToken,isAdmin, UserController.editUser);
authRoute.delete('/:id',verifyToken,isAdmin, UserController.deleteUser);

export default authRoute;
