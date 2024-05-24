import React, { useState, useRef, useEffect } from 'react';
import { fetchMockJobs } from './helper.ts';
import { Table, Input, Button, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {Job} from './types.ts';

const FreelancerJobListingPage = () => {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState(0);
  const [filter, setFilter] = useState({});
  const [total, setTotal] = useState(0);

  const loaderRef = useRef(null);
  useEffect(()=>{
  },[])

  useEffect(() => {
    fetchData();
  }, [pagination]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when at least 50% of the table is visible
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  const handleQuickApply = (record: Job) => {
    // Logic for quick apply
    message.success(`Quick apply to job "${record.title}"`);
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
    setPagination(prevPagination => (prevPagination+1));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    // Fetch data for the current page only
    try {
    const result = await  fetchMockJobs(pagination, filter)
      setData(prevData => [...prevData, ...result.results]);
      setTotal(result.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => document.getElementById('search-input')?.select(), 100);
      }
    },
  });

  const handleSearch = async(selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    const copyFilter = {...filter, [dataIndex]:selectedKeys};
    setFilter(copyFilter)
    const result = await  fetchMockJobs(1, copyFilter)

      setData([...result.results]);
      setTotal(result.total);
    confirm();
  };


  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      ...getColumnSearchProps('skills'),
      render: (skills: string[]) => skills.join(', '),
    },
    {
      title: 'Min Salary',
      dataIndex: 'minSalary',
      key: 'minSalary',
      ...getColumnSearchProps('minSalary'),
      sorter: (a: Job, b: Job) => a.minSalary - b.minSalary,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Job) => (
        <Button type="primary" onClick={() => handleQuickApply(record)}>Quick Apply</Button>
      ),
    },
  ];

  return (
    <div >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
      <div ref={loaderRef}>{total>data.length  ? 'Loading....': 'Thank You'}</div>
    </div>
  );
};

export default React.memo(FreelancerJobListingPage);