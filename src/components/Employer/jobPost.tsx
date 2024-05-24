import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

interface JobPosting {
  id: number;
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string;
  tags: string[];
  companyName: string;
  contactInfo: number;
  applications: number;
}

const EmployerJonPosting: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('values', values);
      const newJob: JobPosting = {
        id: jobs.length + 1,
        jobTitle: values.jobTitle,
        jobDescription: values.jobDescription,
        jobRequirements: values.jobRequirements,
        tags: values.tags.split(',').map(tag => tag.trim()),
        companyName: values.companyName,
        contactInfo: Number(values.contactInfo),
        applications: 0,
      };
      setJobs([...jobs, newJob]);
      message.success('Job posted successfully');
      form.resetFields();
    }).catch((error) => {
      message.error('Please fill in all fields.');
    });
  };


  const validateContactNumber = (_, value: string) => {
    // Regular expression to match a valid contact number
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format
   if (value && !phoneRegex.test(value)) {
      return Promise.reject('Please enter a valid 10-digit contact number');
    }
    return Promise.resolve();
  };


  return (
    <div className='container'>
      <h2>Post the Jobs</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Job Title"
          name="jobTitle"
          rules={[{ required: true, message: 'Please enter the job title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Job Description"
          name="jobDescription"
          rules={[{ required: true, message: 'Please enter the job description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Job Requirements"
          name="jobRequirements"
          rules={[{ required: true, message: 'Please enter the job requirements' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: 'Please enter at least one tag' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: 'Please enter the company name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contactInfo"
          label="Contact Info"
          rules={[
            { required: true, message: 'Please enter contact number' },
            {
              validator: validateContactNumber,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Post Job
          </Button>
        </Form.Item>
      </Form>
      {jobs.length ? <div>
        <h2>Job Posted</h2>
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <strong>{job.jobTitle}</strong>
              <p>Description: {job.jobDescription}</p>
              <p>Applications: {job.applications}</p>
            </li>
          ))}
        </ul>
      </div> : null}
    </div>
  );
};

export default EmployerJonPosting;