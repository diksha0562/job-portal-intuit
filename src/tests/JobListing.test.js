import FreelancerJobListingPage from '../components/Freelancer/jobListing';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import {act} from 'react';
// import { fetchMockJobs } from '../components/Freelancer/helper';
import {mockjobData} from './fixtures/jobData';

jest.mock('../components/Freelancer/helper', () => ({
    fetchMockJobs: () =>  Promise.resolve({results:mockjobData, total:1}),
}));

global.IntersectionObserver = function(){
    this.observe= jest.fn();
        this.unobserve= jest.fn();
  }


describe('renders FreelancerJobListingPage', () => {


    beforeAll(() => {
      delete window.matchMedia
      window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })
    });
    // test('renders freelancer job listing and click on quick apply', async () => {
    //   act(() => {
    //     render(<FreelancerJobListingPage />);
    //   })
    //   await waitFor(() => {
    //     screen.getByRole('columnheader', {
    //       name: /title search/i
    //     })
    //   });
  
    //   await waitFor(() => {
    //     screen.getByRole('cell', {
    //       name: /description for job 1/i
    //     });
    //   });
  
     
  
    //   const quickApplyBtn1 = screen.getAllByRole('button', {
    //     name: /quick apply/i
    //   })[0]
  
  
  
    //   act(() => {
    //     fireEvent.click(quickApplyBtn1);
    //   })
  
    //   await waitFor(() => {
    //     expect(screen.getByText(/quick apply to job "job 1"/i)).toBeInTheDocument();
    //   });
  
  
  
    // });
  
    test('check filter', async () => {
        act(() => {
          render(<FreelancerJobListingPage />);
        })
        await waitFor(() => {
          screen.getByRole('columnheader', {
            name: /title search/i
          })
        });
        const columnheader = screen.getByRole('columnheader', {
            name: /description search/i
          });
          
          fireEvent.click( within(columnheader).getByRole('button', {
            name: /search/i
          }))

          fireEvent.change(screen.getByRole('textbox'),  { target: { value: 'Job 1' } })
          fireEvent.click(screen.getByRole('button', {
            name: /search search/i
          }))
          await waitFor(() => {
            screen.getByRole('cell', {
              name: /description for job 1/i
            });
          });
      

    
      });
  
  
  
  
  })