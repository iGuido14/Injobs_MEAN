// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllProducts } from "../../controllers/productController/getAllProducts";
import { getOneProduct } from "../../controllers/productController/getOneProduct";
import { getPendingProducts } from "../../controllers/productController/getPendingProducts";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/pending", getPendingProducts);
router.get("/product/:slug", getOneProduct);

export default router;
