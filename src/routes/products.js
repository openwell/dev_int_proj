import express from 'express';
import controller from '../controller/productsController';
import imageHandler from '../middleware/imageHandler';
import validate from '../middleware/inputHandler';

const router = express.Router();

router.get('/', controller.home);

router.post('/products', imageHandler, validate.product, controller.createProduct);

router.get('/products', controller.allProducts);

router.get('/products/:productId', validate.Params, controller.findProductById);

export default router;
