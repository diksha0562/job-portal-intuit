import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import {fetchJobPosted, fetchApplicationForJob} from './jobData.tsx'
import { Job, Application } from './types.ts'; // Assume types are defined elsewhere



const EmployerSection: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch jobs posted by the employer
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    // Assume API call to fetch jobs
    const fetchedJobs: Job[] = await fetchJobPosted();
    setJobs(fetchedJobs);
  };

  // Fetch applications for a selected job
  const fetchApplications = async (jobId: string) => {
    // Assume API call to fetch applications for a job
    const fetchedApplications: Application[] = await fetchApplicationForJob(jobId)
    setApplications(fetchedApplications);
  };

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Applications',
      dataIndex: 'applications',
      key: 'applications',
      render: (text: string, record: Job) => {
        console.log('text',text, record)
        return (
            <Button type="link" onClick={() => handleViewApplications(record)} className='pl0'>
              View Applications ({text})
            </Button>
          )
      },
    },
  ];

  const handleViewApplications = (job: Job) => {
    setSelectedJob(job);
    fetchApplications(job.id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <h1>Jobs Posted</h1>
      <Table dataSource={jobs} columns={columns} />

      <Modal
        title={selectedJob ? `Applications for ${selectedJob.title}` : ''}
        open={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <Table
          dataSource={applications}
          columns={[
            { title: 'Applicant Name', dataIndex: 'applicantName', key: 'applicantName' },
            {
              title: 'Profile Details',
              key: 'profileDetais',
              dataIndex: 'profileDetais'
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default EmployerSection;