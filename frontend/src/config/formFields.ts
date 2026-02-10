import { FormFieldConfig } from '@/types';

export const userFormFields: FormFieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    required: true,
    validationRules: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    required: true,
    validationRules: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter email address',
    required: true,
    validationRules: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter phone number',
    required: true,
    validationRules: {
      pattern: /^\+?[\d\s\-\(\)]{10,}$/,
    },
  },
];

