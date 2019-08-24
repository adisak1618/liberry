import { Router } from "express";
import { categoriesRoutes } from "./categories";
import { loginSuccess } from "./lineLoginSuccess"
import { apiRoutes } from "./api";
import { SeedScripping } from "../helper/scrapping";
const router = Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/view/category', categoriesRoutes);
router.use('/admin/loginsuccess', loginSuccess);
router.use('/api/v1', apiRoutes);
router.get('/test', async (req, res) => {
  const data = await SeedScripping();
  res.json({ data: data })
})

export const Routes = router;
