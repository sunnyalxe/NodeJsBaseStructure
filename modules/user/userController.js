import { isEmptyOrUndefined } from "../../helpers/common.js";
import { createError, NOT_FOUND } from "../../helpers/error_helper.js";
import { createRes } from "../../helpers/resHelper.js";
import UserModel from "./userModel.js";

const userModel = new UserModel();

const userController = {
  read: async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        const users = await userModel.findAll();
        res.json(createRes("Success", 1, users));
      } else {
        const userId = req?.body?.user_id || 0;
        const filters = { id: userId };
        const users = await userModel.find(filters);
        if(isEmptyOrUndefined(users))
        {
          next(createError({
            status: NOT_FOUND,
            message: `user not found`,
          }))
        }
        else
        {
          res.json(createRes("Success", 1, users));
        }
        
      }
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const createdUser = await userModel.create({ username, email, password });

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(
        createRes("Success", 1, {
          id: id,
          name: "Existing User",
        })
      );
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  },
  delete: async (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(
        createRes("Success", 1, {
          id: id,
          name: "Existing User",
        })
      );
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  }

};
export default userController;

/* class UserController {
  static readAll = (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(createRes("Success",1,{
        id: id,
        name: "Existing User",
      }));
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  }
  static readOne = (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(createRes("Success",1,{
        id: id,
        name: "Existing User",
      }));
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  }
  static create = (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(createRes("Success",1,{
        id: id,
        name: "Existing User",
      }));
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  }
  static update = (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(createRes("Success",1,{
        id: id,
        name: "Existing User",
      }));
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  }
  
  static delete = (req, res, next) => {
    const id = req.query.id || 0;
    if (id && id > 0) {
      res.json(createRes("Success",1,{
        id: id,
        name: "Existing User",
      }));
    } else {
      next(
        createError({
          status: NOT_FOUND,
          message: `${id} not found`,
        })
      );
    }
  }
}
export default UserController; */
