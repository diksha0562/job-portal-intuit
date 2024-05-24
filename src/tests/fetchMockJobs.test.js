import {fetchMockJobs} from '../components/Freelancer/helper';


describe('fetchMockJobs function', ()=>{
    it('test filter', async()=>{

        const result = await fetchMockJobs(1, {description: ['Job 1']});
        expect(result.results[0].id).toBe( 1)
    })
})