// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllProducts } from "../../controllers/productController/getAllProducts";
import { getOneProduct } from "../../controllers/productController/getOneProduct";

const router = Router();

router.get("/products", getAllProducts);
router.get("/product/:slug", getOneProduct);

export default router;
