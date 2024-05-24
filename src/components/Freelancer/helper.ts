import {Job} from './types';

export const generateMockJobs = (count: number): Job[] => {
    const mockJobs: Job[] = [];
    for (let i = 1; i <= count; i++) {
      mockJobs.push({
        key: i,
        id: i,
        title: `Job ${i}`,
        description: `Description for Job ${i}`,
        skills: ['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5'].sort(() => 0.5 - Math.random()).slice(0, 2),
        minSalary: Math.floor(Math.random() * 100) + 50, // Random salary between 50 and 150
      });
    }
    return mockJobs;
  };

  export const fetchMockJobs = (pagination, filter): Promise<{results:Job[], total: number}> => {
    const copyFilter = {};
    for(let key in filter){
      let val = filter[key];
      if(val.length){
        copyFilter[key] = val[0]
      }
    }
    let start = ((pagination-1)*20);
    let end = start+20;
    let mockJobs: Job[] = generateMockJobs(1000) ;
    let filteredJobs: Job[] = [];
    if(Object.keys(copyFilter)?.length){
      for(let i=0;i<mockJobs.length;i++){
        let job = mockJobs[i];
        let isIncluded = true;
        for(let key in copyFilter){
          if(!job[key].toString().toLowerCase().includes(copyFilter[key].toLowerCase())){
            isIncluded = false;
            break;
          }
        }
        if(isIncluded){
          filteredJobs.push(job)
        }
      }
      mockJobs=[...filteredJobs];
    }
    return new Promise((resolve) => {
        setTimeout(resolve, 500, {
            results: mockJobs.slice(start, end),
            total: mockJobs.length
        });
      });
  };