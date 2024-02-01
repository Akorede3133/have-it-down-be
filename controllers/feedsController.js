import { validationResult } from "express-validator"

export const create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
  } catch (error) {
    next(error)
  }
}