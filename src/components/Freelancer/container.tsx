import React, { useState,Suspense, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import FreelancerJobListingPage from './jobListing.tsx';
import { useNavigate } from "react-router-dom";
const LazyFreelancerProfile = React.lazy(() => import('./profile.tsx'))


const FreelancerContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('jobListing');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem('freelancer')){
      navigate('/')
    }
  },[])
 

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const items: TabsProps['items'] = [
    {
      key: 'jobListing',
      label: 'FreelancerJobListing',
      children:   <FreelancerJobListingPage />,
    },
    {
      key: 'profile',
      label: 'FreelancerProfile',
      children:  <LazyFreelancerProfile />,
    }
  ];

  return (
    <div className='container'>
          <Suspense fallback={<div>Loading..</div>}>
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange} items={items}/>
      </Suspense>
    </div>
  );
};

export default FreelancerContainer;