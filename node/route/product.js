import express from 'express';
import { ProductController } from "../controller/productController.js";
import { isAdmin, verifyToken } from '../middleware/auth.js';
import { uploadImage } from '../middleware/imageupload.js';

const productRoute= express.Router();
const controller = new ProductController();

productRoute.get("/",verifyToken, controller.productIndex);
productRoute.post("/",verifyToken,isAdmin, uploadImage,controller.productStore);
productRoute.put("/:id",verifyToken,isAdmin,uploadImage,controller.productEdit);
productRoute.delete("/:id",verifyToken,isAdmin, controller.productDelete);

export default productRoute;
