import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

type Schemas = {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};

export const validateRequest = (schemas: Schemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    if (schemas.body) {
      const { error, value } = schemas.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        errors.push(...error.details.map((d) => `Body: ${d.message}`));
      } else {
        req.body = value; 
      }
    }

    if (schemas.params) {
      const { error, value } = schemas.params.validate(req.params, {
        abortEarly: false,
      });

      if (error) {
        errors.push(...error.details.map((d) => `Params: ${d.message}`));
      } else {
        req.params = value;
      }
    }

    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        errors.push(...error.details.map((d) => `Query: ${d.message}`));
      } else {
        req.query = value;
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: `Validation error: ${errors.join(", ")}`,
      });
    }

    next();
  };
};