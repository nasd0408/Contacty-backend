const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.error(err.stack);
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Error de validacion", message: err.message, stackTrace: err.stack });
      break;

    case constants.NOT_FOUND:
      res.json({ title: "No encontrado", message: err.message, stackTrace: err.stack });
      break;

    case constants.UNAUTHORIZED:
      res.json({ title: "Sin autorizacion", message: err.message, stackTrace: err.stack });
      break;

    case constants.FORBIDEN:
      res.json({ title: "Prohibido", message: err.message, stackTrace: err.stack });
      break;

    case constants.SERVER_ERROR:
      res.json({ title: "Error de servidor", message: err.message, stackTrace: err.stack });
      break;

    default:
      res.status(statusCode).json({ title: "Error", message: err.message, stackTrace: err.stack });
      break;
  }
};

module.exports = errorHandler;
