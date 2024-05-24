import React, { useState } from 'react';
import { Tabs, message, Spin } from 'antd';
import type { TabsProps } from 'antd';
import EmployerLoginForm from './EmployerLoginForm.tsx';
import FreelancerLoginForm from './FreelancerLoginForm.tsx';
import { useNavigate } from "react-router-dom";
import {validateLogin} from './helper.ts';


const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('employer');
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  async function handleSubmit (url){
    try{
      setLoading(true)
      await validateLogin(url);
      sessionStorage.setItem(url, 'true')
      navigate(`/${url}`);
    }catch(e){
      message.error('Something went wrong. Please try again');
    }finally{
      setLoading(false)
    }
    
  }

  const items: TabsProps['items'] = [
    {
      key: 'employer',
      label: 'Employer',
      children:  <EmployerLoginForm onSubmit={handleSubmit} isLoading={isLoading}/>,
    },
    {
      key: 'freelancer',
      label: 'Freelancer',
      children:  <FreelancerLoginForm onSubmit={handleSubmit} isLoading={isLoading}/>,
    }
  ];

  return (
    <div className='loginContainer' >
      {isLoading&& <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>}
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange} items={items}/>
    </div>
  );
};

export default Login;

