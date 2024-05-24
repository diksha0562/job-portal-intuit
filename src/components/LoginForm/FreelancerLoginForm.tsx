import React from 'react';
import { Form, Input, Button, message } from 'antd';

interface FreelancerLoginFormProps {
  onSubmit: (val:string) => void;
  isLoading: boolean
}

const FreelancerLoginForm: React.FC<FreelancerLoginFormProps> = ({ onSubmit,isLoading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('values', values);
      onSubmit('freelancer');
      
    } catch (error) {
      message.error('Please fill in all fields.');
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Freelancer Email"
        name="emailForFreeLancer"
        rules={[{ required: true, message: 'Please enter your email' },  {
          type: 'email',
          message: 'The input is not valid E-mail!',
        }]}
      >
        <Input name='Email for Freelancer' />
      </Form.Item>

      <Form.Item
        label="Freelancer Password"
        name="passwordForFreeLancer"
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

export default FreelancerLoginForm;