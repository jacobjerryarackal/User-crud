import Joi from "joi";
import { UserFormData } from "../types/users.types";

export const createUserSchema =
  Joi.object<UserFormData>({
    firstName: Joi.string().min(1).trim().required(),
    lastName: Joi.string().min(1).trim().required(),
    phoneNumber: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }).options({ stripUnknown: true });

export const updateUserSchema =
  Joi.object<Partial<UserFormData>>({
    firstName: Joi.string().min(1).trim(),
    lastName: Joi.string().min(1).trim(),
    phoneNumber: Joi.string().min(8),
    email: Joi.string().email(),
  }).options({ stripUnknown: true });
