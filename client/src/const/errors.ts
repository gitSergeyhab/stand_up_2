export const UserErrorMessage = {
  All: 'Все поля должны быть заполнены',
  Nik: 'Nik должен быть не больше 50 символов и не меньше 3',
  Password: 'пароль должен быть не меньше 8 символов',
  PasswordRepeat: 'пароли должны совпадать',
};

export const ServerError = {
  Default: 'Server Error - Try Again Later',
};

export const enum StatusCode {
  UnknownServerError = 500,
  NotFoundError = 404,
  BadRequest = 400,
  NotAuthError = 401,
  Ok = 200,
  Added = 201,
  Deleted = 204,
}
