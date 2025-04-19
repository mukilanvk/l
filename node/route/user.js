import express from 'express';
import { userController } from "../controller/userController.js";

const authRoute = express.Router();
const UserController = new userController;

authRoute.post('/register', UserController.register);
authRoute.post('/login', UserController.login);
authRoute.get('/', UserController.userIndex);
authRoute.put('/:id', UserController.editUser);
authRoute.delete('/:id', UserController.deleteUser);

export default authRoute;
