import * as Yup from 'yup';

export const createNewsletterSchema = (invalidEmailMessage: string) =>
  Yup.object({
    email: Yup.string().email(invalidEmailMessage).required(invalidEmailMessage),
  });
