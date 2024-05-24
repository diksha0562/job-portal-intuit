import React, { useState } from 'react';
import { Form, Input, Button, message, Flex } from 'antd';


const FreelancerProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [gitProjects, setGitProjects] = useState<any[]>([]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Saved profile',{
        skills: values.yourSkills.split(',').map((skill: string) => skill.trim()),
        gitUsername: values.gitUsername
      });
      form.resetFields();
      setGitProjects([])
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Please fill in all fields.');
    }
  };

  const fetchGitProjects = async () => {
    const gitUsername = form.getFieldValue('gitUsername');
    if (!gitUsername) {
      message.error('Please enter your GitHub username.');
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${gitUsername}/repos`);
      const data = await response.json();
      setGitProjects(data);
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Add your skills in comma seperated format"
          name="yourSkills"
          rules={[{ required: true, message: 'Please enter your skills' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="GitHub Username"
          name="gitUsername"
          rules={[{ required: true, message: 'Please enter your GitHub username' }]}
        >
          <Input  />
        </Form.Item>
      
   
        <Flex align="flex-start" gap="large" vertical>
        <Button type="default" onClick={fetchGitProjects}>
          List Github projects
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Save Profile
        </Button>
        </Flex>
      </Form>
      {gitProjects.length > 0 && (
        <div>
          <h2>GitHub Projects</h2>
          <ul>
            {gitProjects.map((project: any) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FreelancerProfile;