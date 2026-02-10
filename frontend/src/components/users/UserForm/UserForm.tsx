'use client';

import { useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd'; 
import type { Rule } from "antd/es/form";
import { User, UserFormData } from '@/types';
import { userFormFields } from '@/config/formFields';
import styles from './UserForm.module.css';

interface UserFormProps {
  onSubmit: (values: UserFormData) => Promise<void>;
  onCancel?: () => void;
  initialData?: User | null;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async (values: UserFormData) => {
    await onSubmit(values);
    if (!initialData) {
      form.resetFields();
    }
  };

  const getValidationRules = (field: typeof userFormFields[0]) => {
    const rules: Rule[] = []; // Use Ant Design's Rule type

    // Add required rule
    if (field.required) {
      rules.push({
        required: true,
        message: `${field.label} is required`,
      });
    }

    // Add validation rules from config
    if (field.validationRules) {
      if (field.validationRules.pattern) {
        rules.push({
          pattern: field.validationRules.pattern,
          message: `Invalid ${field.label.toLowerCase()}`,
        });
      }

      if (field.validationRules.minLength) {
        rules.push({
          min: field.validationRules.minLength,
          message: `${field.label} must be at least ${field.validationRules.minLength} characters`,
        });
      }

      if (field.validationRules.maxLength) {
        rules.push({
          max: field.validationRules.maxLength,
          message: `${field.label} must not exceed ${field.validationRules.maxLength} characters`,
        });
      }
    }

    // Add type-specific rules
    if (field.type === 'email') {
      rules.push({
        type: 'email' as const,
        message: 'Please enter a valid email address',
      });
    }

    return rules;
  };

  const renderFormField = (field: typeof userFormFields[0]) => {
    const rules = getValidationRules(field);

    switch (field.type) {
      case 'email':
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
            className={styles.formItem}
          >
            <Input
              type="email"
              placeholder={field.placeholder}
              size="large"
            />
          </Form.Item>
        );

      case 'tel':
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
            className={styles.formItem}
          >
            <Input
              type="tel"
              placeholder={field.placeholder}
              size="large"
            />
          </Form.Item>
        );

      default:
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
            className={styles.formItem}
          >
            <Input
              placeholder={field.placeholder}
              size="large"
            />
          </Form.Item>
        );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className={styles.form}
      size="large"
    >
      <div className={styles.fieldsGrid}>
        {userFormFields.map(field => renderFormField(field))}
      </div>

      <div className={styles.actions}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className={styles.submitButton}
          >
            {initialData ? 'Update User' : 'Create User'}
          </Button>
          {onCancel && (
            <Button
              onClick={onCancel}
              size="large"
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          )}
        </Space>
      </div>
    </Form>
  );
};

export default UserForm;