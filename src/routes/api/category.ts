import { Router } from "express";
import { Request, Response } from "express";
import { body } from "express-validator/check";
import { LineUser } from "../../entity/LineUser";
import { getManager } from "typeorm";
const { response, validateBody } = require('./../../helper');
const router = Router();
// const models = require('./../../models');

/* list all categories. */
const checkChooseBody = [
  body('lineUserId').not().isEmpty(),
  body('categoryId').not().isEmpty(),
];
router.post('/choose', checkChooseBody, validateBody, async (req: Request, res: Response) => {
  console.log('cattegories api testest', req.body);
  try {
    let lineuser = await getManager()
      .createQueryBuilder(LineUser, "lineuser")
      .where({ lineid: req.body.lineUserId })
      .leftJoinAndSelect("lineuser.actions", "action", "action.success = :isSuccess", { isSuccess: false })
      .getOne();
    const action = lineuser.actions[0];
    const actionData = action.data || {};
    action.data = { ...actionData, category: req.body.categoryId }
    action.save();
    response(res, action.data);
  } catch (error) {
    console.log(error);
    response(res, null, 'cantnotupdatecategorychooses', 'can not update');
  }
});

export const CategoriesApi = router;
