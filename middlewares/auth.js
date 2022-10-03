const to = require('await-to-js').default;
const { sign, verify } = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/errors')
const constants = require('../constants');
require("dotenv").config();

const generateJWT = (payload, expiry = process.env.JWT_EXPIRES_IN) =>
  sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expiry });

const getTokenFromHeader = async (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  
  const error = new ErrorHandler(constants.ERRORS.AUTH, {
    statusCode: 401,
    message: 'Missing or invalid authentication header',
  });

  throw error;
};

const verifyToken = async (token) => verify(token, process.env.JWT_SECRET_KEY);

const authMiddleware = async (req, res, next) => {
  const [err, token] = await to(getTokenFromHeader(req));
  if (err) {
    next(err);
  }

  const [err2, payload] = await to(verifyToken(token));
  if (err2) {
    const error = new ErrorHandler(constants.ERRORS.AUTH, {
      statusCode: 401,
      errStack: err2,
      message: 'JWT authentication failed',
    });
    next(error);
  }
  res.locals.decode = payload;
  next();
};

module.exports = { authMiddleware, generateJWT, verifyToken };
