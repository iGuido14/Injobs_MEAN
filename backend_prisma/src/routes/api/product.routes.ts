import { Router } from "express";
import { userGet, userUpdate } from "../../controllers/userController";
import { authenticate } from "../../middleware/auth/authenticator";
import { userUpdateValidator } from "../../middleware/userValidator";
import productGetAll from "../../controllers/productController/productGetAll";
import productGetOne from "../../controllers/productController/productGetOne";

const router = Router();

router.get("/products", productGetAll);
router.get("/product/:slug", productGetOne);

export default router;