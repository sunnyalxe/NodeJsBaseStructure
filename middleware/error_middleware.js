"use strict";

import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  UNPROCESSABLE,
  GENERIC_ERROR,
} from "../helpers/error_helper.js";
const unauthorized = (err, req, res, next) => {
  if (err.status === UNAUTHORIZED) {
    //console.log(`unauthorized => ${err.status} === ${UNAUTHORIZED}`);
    res.status(UNAUTHORIZED).send({
      ok: false,
      message: err.message || "Unauthorized",
      errors: [err],
    });
  } else {
    next(err);
  }
};

const forbidden = (err, req, res, next) => {
  if (err.status === FORBIDDEN) {
    //console.log(`forbidden => ${err.status} === ${FORBIDDEN}`);
    res.status(FORBIDDEN).send({
      ok: false,
      message: err.message || "Forbidden",
      errors: [err],
    });
  } else {
    next(err);
  }
};

const conflict = (err, req, res, next) => {
  if (err.status === CONFLICT) {
    //console.log(`conflict => ${err.status} === ${CONFLICT}`);
    res.status(CONFLICT).send({
      ok: false,
      message: err.message || "Conflict",
      errors: [err],
    });
  } else {
    next(err);
  }
};

const badRequest = (err, req, res, next) => {
  if (err.status === BAD_REQUEST) {
    //console.log(`badRequest => ${err.status} === ${BAD_REQUEST}`);
    res.status(BAD_REQUEST).send({
      ok: false,
      message: err.message || "Bad Request",
      errors: [err],
    });
  } else {
    next(err);
  }
};

const unprocessable = (err, req, res, next) => {
  if (err.status === UNPROCESSABLE) {
    //console.log(`unprocessable => ${err.status} === ${UNPROCESSABLE}`);
    res.status(UNPROCESSABLE).send({
      ok: false,
      message: err.message || "Unprocessable entity",
      errors: [err],
    });
  } else {
    next(err);
  }
};


// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const notFound = (err, req, res, next) => {
  if (err.status === NOT_FOUND) {
    //console.log(`notFound => ${err.status} === ${NOT_FOUND}`);
    res.status(NOT_FOUND).send({
      ok: false,
      message: err.message || "The requested resource could not be found",
    });
  } else {
    next(err);
  }
};

// If there's still an error at this point, return a generic 500 error.
const genericError = (err, req, res, next) => {
  if (!res.headerSent && err.status === GENERIC_ERROR) {
    //console.log(`genericError => If there's still an error at this point, return a generic 500 error.`);
    res.status(GENERIC_ERROR).send({
      ok: false,
      message: err.message || "Internal server error",
      errors: [err],
    });
  } else {
    next(err);
  }
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const catchall = (req, res, next) => {
  if (!res.headerSent) {
    //console.log(`catchall => If there's nothing left to do after all this (and there's no error),`);
    res.status(NOT_FOUND).send({
      ok: false,
      message: "The requested resource could not be found.",
    });
  } else {
    next();
  }
};

const exportables = {
  unauthorized,
  forbidden,
  conflict,
  badRequest,
  unprocessable,
  notFound,
  genericError,
  catchall,
};

// All exportables stored as an array (e.g., for including in Express app.use())
const allError = Object.keys(exportables).map((key) => exportables[key]);

export default allError;
export { exportables };
