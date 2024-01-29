import { validationResult } from "express-validator";
import { handleError } from "../utils/errorUtil.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";

export const register = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      handleError(422, errors.array()[0].msg)
    }
    const user = await User.findOne({ where: { email } });

    if (user) {
      handleError(422, 'User already exists');
    }
    const newUser = await User.create({ 
      name, 
      email, 
      password: await bcrypt.hash(password, 12)
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h"
    });
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000
    })
    res.status(201).send({message: 'User successfully created', user: newUser});
  } catch (error) {
    next(error);
  }  
}