import jwt from "jsonwebtoken";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateToken = (user, type = "accessToken") => {
  console.log(user)
  // JWT payload
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role || "",
  };

  // JWT options, including the expiration time
  const options = {
    expiresIn: type === "refreshToken" ? "7d" : "1h", // Token expiration time (1 hour in this case)
  };
  const secretKey = type === "refreshToken" ? REFRESH_SECRET : ACCESS_SECRET;

  // Sign the token
  const token = jwt.sign(payload, secretKey, options);
  return token;
};
export const validateRefreshToken = (req, res, next) => {
  const refreshToken = readRefreshToken(req);
  try {
    if (!refreshToken) {
      return {
        status: 400,
        msg: "Access Denied. No token provided.",
        user: "",
      };
    }
    const user = jwt.verify(refreshToken, REFRESH_SECRET);
    console.log("decoded",user)

    return { status: 200, msg: "Token is valid", user: user };
  } catch (error) {
    return { status: 401, msg: "Access Denied. Invalid token.", user: "" };
  }
};

const readRefreshToken = (req) => {
  // Get the Authorization header from the request
  const refreshToken = req.headers["refresh-token"];
  if (refreshToken) {
    return refreshToken;
  }
  return false;
};
const isRefreshTokenExpiring = (refreshToken) => {
  // Get the current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  // Calculate the remaining time until token expiration in seconds
  const timeRemaining = decoded.exp - currentTime;
  // Convert the remaining time to days
  const daysRemaining = Math.floor(timeRemaining / (3600 * 24));
  return daysRemaining <= 1 ? true : false;
};
