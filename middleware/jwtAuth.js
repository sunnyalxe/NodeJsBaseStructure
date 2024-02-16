import jwt from "jsonwebtoken";
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
} from "../helpers/error_helper.js";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

/* Validate the Access Token */
export const authenticate = (req, res, next) => {
  const accessToken = readAccessToken(req);
  try {
    if (!accessToken) {
      next(
        createError({
          status: BAD_REQUEST,
          message: "Access Denied. No token provided.",
        })
      );
    }
    const decoded = jwt.verify(accessToken, ACCESS_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error)
    next(
      createError({
        status: UNAUTHORIZED,
        message: "Access Denied. Invalid token",
      })
    );
  }
};
const readAccessToken = (req) => {
  // Get the Authorization header from the request
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      // Extract the token from the Authorization header
      return tokenParts[1];
    }
  }
  return false;
};
