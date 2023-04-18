import { expressYupMiddleware } from 'express-yup-middleware';

const validateOptions = { abortEarly: false };

export const validate = (yupSchema) =>
  expressYupMiddleware({
    schemaValidator: {
      schema: {
        body: { validateOptions, yupSchema },
      },
    },
  });
