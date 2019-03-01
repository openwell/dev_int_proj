import { check, validationResult } from 'express-validator/check';
import errorHandler from './errorHandler';

function validatorFunction(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array(),
    });
  }
  return next();
}

function paramsValidation(req, res, next) {
  const params = req.params.productId;
  if (/^\d*$/.test(params)) {
    return next();
  } return errorHandler(400, res, 'params must be an integer');
}

function validationHandlerForIntegerInput(arg) {
  return check(arg)
    .trim()
    .not().isEmpty().withMessage('field must not be empty')
    .matches(/^\d*$/).withMessage('regex')
    .isInt()
    .escape()
    .withMessage('must be an integer');
}

function validationHandlerForStringInput(arg) {
  return check(arg)
    .trim()
    .not().isEmpty().withMessage('field must not be empty')
    .customSanitizer(value => value.replace(/\s+/g, ' '))
    .matches(/^[a-zA-Z0-9 ,._#'-]+$/i)
    .withMessage("Special Characters not Allowed expect (.,_'-#)")
    .isString()
    .escape()
    .withMessage('must be a string');
}

const middleware = {
  product: [
    validationHandlerForStringInput('name'),
    validationHandlerForStringInput('description'),
    validationHandlerForIntegerInput('price'),
    validationHandlerForStringInput('category'),
    validationHandlerForStringInput('color'),
    validatorFunction,
  ],
  Params: [paramsValidation],
};
export default middleware;
