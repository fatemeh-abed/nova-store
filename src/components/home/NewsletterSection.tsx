'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createNewsletterSchema } from '@/validations/newsletterSchema';
import { Mail } from 'lucide-react';

import Button from '@/shared/Button';

const News = styled.section`
  margin-block: 35px;
  background: ${({ theme }) => theme.colors.subtle};
  padding: 20px 28px;
  border-radius: ${({ theme }) => theme.tokens.radii.lg};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  h2 {
    margin: 0 0 5px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 13px;
  }

  form {
    display: flex;
    gap: 10px;
    flex: 1;
    max-width: 440px;
  }

  input {
    min-width: 0;
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.tokens.radii.md};
    padding: 12px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;

    form {
      max-width: none;
    }
  }
`;

const NewsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const FormFields = styled.div`
  flex: 1;
  min-width: 0;
`;

const EmailInput = styled(Field)`
  width: 100%;
`;

const ValidationError = styled.div`
  color: #dc2626;
  font-size: 12px;
  margin-top: 6px;
`;

interface NewsletterValues {
  email: string;
}

export default function NewsletterSection() {
  const t = useTranslations('landing');
  const [subscribed, setSubscribed] = useState(false);

  const validationSchema = createNewsletterSchema(t('newsletterInvalid'));

  const initialValues: NewsletterValues = {
    email: '',
  };

  return (
    <News>
      <NewsInfo>
        <Mail size={38} />

        <div>
          <h2>{t('newsletterTitle')}</h2>
          <p>{subscribed ? t('newsletterSuccess') : t('newsletterText')}</p>
        </div>
      </NewsInfo>

      <Formik<NewsletterValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(_, actions) => {
          // Demo only: no newsletter API is connected.
          setSubscribed(true);
          actions.resetForm();
        }}
      >
        <Form>
          <FormFields>
            <EmailInput
              name="email"
              type="email"
              aria-label={t('newsletterPlaceholder')}
              placeholder={t('newsletterPlaceholder')}
              aria-describedby="newsletter-email-error"
            />

            <ValidationError id="newsletter-email-error">
              <ErrorMessage name="email" />
            </ValidationError>
          </FormFields>

          <Button type="submit">{t('newsletterSubmit')}</Button>
        </Form>
      </Formik>
    </News>
  );
}
