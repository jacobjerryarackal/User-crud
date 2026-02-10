export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  details?: string[];
}

export interface ApiError {
  error: string;
  success: boolean;
  details?: string[];
}

export type FormFieldType = 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select';

export interface FormFieldConfig {
  name: keyof UserFormData | string; 
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  validationRules?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => boolean;
  };
  options?: Array<{ label: string; value: string }>;
}