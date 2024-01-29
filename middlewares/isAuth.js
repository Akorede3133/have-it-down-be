import jwt  from "jsonwebtoken";
import { handleError } from "../utils/errorUtil.js";

const isAuth = (req, res, next) => {
  const { auth_token } = req.cookies;
  try {
    if (!auth_token) {
      handleError(401, 'Sign in')
    }
    jwt.verify(auth_token, process.env.JWT_SECRET_KEY, (err, value) => {
      if (err) {
        console.log(err.message);
        handleError(401, err);
      }
      req.userId = value.userId;
      next();
    });

  } catch (error) {
    next(error);
  }
}

export default isAuth;