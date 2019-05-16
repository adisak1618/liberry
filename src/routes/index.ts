import { Router } from "express";
import { categoriesRoutes } from "./categories";
import { loginSuccess } from "./lineLoginSuccess"
import { apiRoutes } from "./api";
const router = Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/view/category', categoriesRoutes);
router.use('/admin/loginsuccess', loginSuccess);
router.use('/api/v1', apiRoutes);

export const Routes = router;
