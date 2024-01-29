import User from "../models/userModel.js";
import { handleError } from "../utils/errorUtil.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({ where: { email }});
    if (!user) {
      handleError(404, 'Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      handleError(401, 'Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h"
    });
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000
    });
    res.status(200).send({ message: 'User signed in successfully', user: {name: user.name, email: user.email,  }  })
  } catch (error) {
    next(error);
  }
}