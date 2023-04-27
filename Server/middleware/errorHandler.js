const errorHandler = (err, req, res, next) => {
  console.log(err)
  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "email_is_required":
      status = 400;
      message = "Email is Required!";  
      break;
    case "password_is_required":
      status = 400;
      message = "Password is Required!";   
      break;
    case "wrong_email_or_password":
      status = 401;
      message = "Invalid Email or Password";  
      break;
    case "AccessTokenMissing":
      status = 400;
      message = "access_token in headers is required";
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "NotFound":
      status = 404;
      message = "Data Not Found";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
  }

  res.status(status).json( { message } );
};

module.exports = errorHandler;
