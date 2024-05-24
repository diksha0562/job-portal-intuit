import React from 'react';
import { Form, Input, Button, message } from 'antd';

interface EmployerLoginFormProps {
  onSubmit: (val:string) => void;
  isLoading: boolean;
}

const EmployerLoginForm: React.FC<EmployerLoginFormProps> = ({ onSubmit,isLoading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('values',values);
      onSubmit('employer');
    } catch (error) {
      message.error('Please fill in all fields.');
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email' },  {
          type: 'email',
          message: 'The input is not valid E-mail!',
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' },{ min: 10, message: 'Password must be minimum 10 characters.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit} disabled={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployerLoginForm;