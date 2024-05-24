import { Job, Application } from './types.ts';
const jobData = [{
    title: 'Job 1',
    applications: 3,
    id: '1',
    key: 1
}, {
    title: 'Job 2',
    applications: 2,
    id: '2',
    key: 2
},
{
    title: 'Job 1',
    applications: 3,
    id: '3',
    key: 3
}, {
    title: 'Job 2',
    applications: 2,
    id: '4',
    key: 4
},
{
    title: 'Job 1',
    applications: 3,
    id: '5',
    key: 5
}, {
    title: 'Job 2',
    applications: 2,
    id: '6',
    key: 6
},
{
    title: 'Job 1',
    applications: 3,
    id: '7',
    key: 7
}, {
    title: 'Job 2',
    applications: 2,
    id: '8',
    key: 8
},
{
    title: 'Job 1',
    applications: 3,
    id: '9',
    key: 9
}, {
    title: 'Job 2',
    applications: 2,
    id: '10',
    key: 10
},
{
    title: 'Job 1',
    applications: 3,
    id: '11',
    key: 11
}, {
    title: 'Job 2',
    applications: 2,
    id: '12',
    key: 12
},
{
    title: 'Job 1',
    applications: 3,
    id: '13',
    key: 13
}, {
    title: 'Job 2',
    applications: 2,
    id: '14',
    key: 14
}];


const mockApplicationData = {
    1: [{ applicantName: 'Shyam', profileDetais: 'Btech, 7 years of experience', key: 1 }, { applicantName: 'Foo', profileDetais: 'Btech, 5 years of experience', key: 3 }, { applicantName: 'Abhay', profileDetais: 'Btech, 4 years of experience', key: 4 }],
    2: [{ applicantName: 'Ram', profileDetais: 'Mtech, 8 years of experience', key: 5 }, { applicantName: 'Radha', profileDetais: 'Mtech, 9 years of experience', key: 6 }]
}

export function fetchApplicationForJob(jobId): Promise<Application[]> {
    return new Promise((resolve) => {
        setTimeout(resolve, 500, mockApplicationData[jobId]);
    });
}

export function fetchJobPosted(): Promise<Job[]> {
    return new Promise((resolve) => {
        setTimeout(resolve, 500, jobData);
    });
}