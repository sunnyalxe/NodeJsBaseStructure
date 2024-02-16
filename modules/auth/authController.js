import { createError,BAD_REQUEST } from "../../helpers/error_helper.js";
import { createRes } from "../../helpers/resHelper.js";
import { generateToken, validateRefreshToken } from "../../helpers/authHelper.js";
import UserModel from "../user/userModel.js";
const userModel = new UserModel();

/**
 * Login will create refresh token
 * getAccess token will create access token from refresh token
 * refresh token will be expired in 10 minutes and needs to regenerate when expired
 * Each day front end will refresh the refresh token for parmanent login
 */

const authController = {
  login: async (req, res, next) => {
    // generate refresh token while login and call generate access token after that 
    // refresh token will be valid for 7 day and access token will be valid for 10 minutes
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Credentials are missing.");
      } else {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userModel.verify(username, password);
        // Generate a JWT token and send it in the response
        res.setHeader("refresh-token", generateToken(user,'refreshToken'));
        res.json(createRes("Success", 1, {}));
      }
    } catch (error) {
      next(error);
    }
  },
  refreshRefreshToken: async (req, res, next) => {
    // refresh the resfresh token from existing token
    try {
      const tokenObj = validateRefreshToken(req);
      if(tokenObj.status === 200)
      {
        const token =  generateToken(tokenObj.user,'refreshToken');
        res.setHeader("refresh-token", token);
        res.json(createRes("Success", 1, {}));
      }
      else
      {
        next(createError({
          status: tokenObj.status,
          message: tokenObj.msg,
        }));
      }
    } catch (error) {
      next(error);
    }
  },
  getAccessToken: async (req, res, next) => {
    // refresh the resfresh token from existing token
    try {
      const tokenObj = validateRefreshToken(req);
      if(tokenObj.status == 200)
      {
        const token =  generateToken(tokenObj.user,'accessToken');
        res.json(createRes("Success", 1, {accessToken:token}));
      }
      else
      {
        next(createError({
          status: tokenObj.status,
          message: tokenObj.msg,
        }));
      }
    } catch (error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const createdUser = await userModel.create({ username, email, password });

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
export default authController;