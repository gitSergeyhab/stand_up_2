import Joi from "joi";
import { JoiMessageKey } from "../const";

const Message = {
    NikMin: `you need at least 3 characters in your Nik`,
    NikMax: `Max length of Nik is 50`,
    NameBad: `the name can only contain letters and a space`,
    Email: `email is incorrect`,
    Password: `you need at least 8 characters in the password`,
    PasswordRepeat: `the passwords do not match`,
    Picture: `the image type is not supported`
  };

  const Pattern = {
    NAME: /[^0-9$&+,:;=?@#|'<>.^*()%!]+$/,
    AVATAR: /.+\.jpg\b|.+\.png\b/
  };

  const CharacterNumber = {
    NikMin: 3,
    NikMax: 50,
    Email: 2,
    Name: 2,
    Password: 8
  };

export const userSchema = Joi.object({
    nik: Joi.string().min(CharacterNumber.NikMin).max(CharacterNumber.NikMax).required().messages({
        [JoiMessageKey.StringMin]: Message.NikMin,
        [JoiMessageKey.StringMax]: Message.NikMax,
    }),
    email: Joi.string().email().required().messages({
        [JoiMessageKey.Email]: Message.Email,
      }),
    password: Joi.string().min(CharacterNumber.Password).required().messages({
        [JoiMessageKey.StringMin]: Message.Password
    }),
    passwordRepeat: Joi.string().valid(Joi.ref(`password`)).required().messages({
        [JoiMessageKey.AnyOnly]: Message.PasswordRepeat
    }),
})