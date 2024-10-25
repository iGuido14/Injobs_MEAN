import { Router } from "express";
import productGetAll from "../../controllers/productController/productGetAll";
import productGetOne from "../../controllers/productController/productGetOne";
import getProductsAuthor from "../../controllers/productController/getProductsAuthor";
import productCreate from "../../controllers/productController/productCreate";

const router = Router();

router.get("/products", productGetAll);

router.get("/product/:slug", productGetOne);

router.get("/product/company/:username", getProductsAuthor);

router.post("productCreate", productCreate);

export default router;