import { Router } from "express";
import { CategoriesApi } from "./category";


const router = Router();

router.use('/category', CategoriesApi);
export const apiRoutes = router;
