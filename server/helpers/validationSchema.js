import joi from '@hapi/joi';

export const signInSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const signUpSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
});

export const profileSchema = joi.object().keys({
  address: joi.string().required(),
  bio: joi.string().required(),
  occupation: joi.string().required(),
  expertise: joi.string().required(),
});

export const sessionSchema = joi.object().keys({
  category: joi.string().required(),
  mentorId: joi.number().required(),
  question: joi.string().required(),
});
