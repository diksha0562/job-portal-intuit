import React, { useState,Suspense, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EmployerJobPostings from './jobListing.tsx';
import { useNavigate } from "react-router-dom";
const LazyJobPost = React.lazy(() => import('./jobPost.tsx'))


const FreelancerContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('jobsPosted');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem('employer')){
      navigate('/')
    }
  },[])
 

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const items: TabsProps['items'] = [
    {
      key: 'jobsPosted',
      label: 'Jobs Posted',
      children:   <EmployerJobPostings />,
    },
    {
      key: 'postNewJob',
      label: 'Post New Job',
      children:  <LazyJobPost />,
    }
  ];

  return (
    <div className='loginContainer'>
          <Suspense fallback={<div>Loading..</div>}>
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange} items={items}/>
      </Suspense>
    </div>
  );
};

export default FreelancerContainer;