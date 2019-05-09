var express = require('express');
var router = express.Router();
import { Request, Response } from "express";
import { Category } from "../entity/Category";
// const models = require('./../models');

/* list all categories. */
router.get('/', async (req: Request, res: Response) => {
  const categories = await Category.find()
  // const categories = await models.category.findAll({
  //   raw: true,
  // });
  res.render('index', { title: 'Express', categories });
});

export const categoriesRoutes = router;
