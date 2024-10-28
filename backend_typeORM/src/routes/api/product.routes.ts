// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllProducts } from "../../controllers/productController/productGetAll";

const router = Router();

router.get("/products", getAllProducts);

export default router;
