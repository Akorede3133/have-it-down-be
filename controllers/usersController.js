import { validationResult } from "express-validator";
import { handleError } from "../utils/errorUtil";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      handleError(422, errors.array[0].msg)
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
    res.status(201).send({message: 'User successfully created', user: newUser});
  } catch (error) {
    next(error);
  }  
}