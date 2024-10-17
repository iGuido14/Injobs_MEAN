import { Router } from "express";
import { userGet, userUpdate } from "../../controllers/userController";
import { authenticate } from "../../middleware/auth/authenticator";
import { userUpdateValidator } from "../../middleware/userValidator";
import productGetAll from "../../controllers/productController/productGetAll";

const router = Router();

router.get("/products", productGetAll);

export default router;