import { Router } from "express";
import productGetAll from "../../controllers/productController/productGetAll";
import productGetOne from "../../controllers/productController/productGetOne";
import getProductsAuthor from "../../controllers/productController/getProductsAuthor";

const router = Router();

router.get("/products", productGetAll);

router.get("/product/:slug", productGetOne);

router.get("/product/company/:username", getProductsAuthor);

export default router;