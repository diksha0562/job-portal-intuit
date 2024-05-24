import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployerContainer from '../components/Employer/container';
import { BrowserRouter as Router } from 'react-router-dom';
import {act} from 'react';

global.IntersectionObserver = function(){
  this.observe= jest.fn();
      this.unobserve= jest.fn();
}

describe('renders Employer Container', () => {


  beforeAll(() => {
    delete window.matchMedia
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })

  });
  test('renders EmployerContainer jobs posted so far ', async () => {
    act(() => {
      render(<Router><EmployerContainer /></Router>);
    })
    await waitFor(() => {
        screen.getByRole('cell', {
            name: /job 1/i
          })
    });
    fireEvent.click(screen.getByRole('button', {
        name: /view applications \(10\)/i
      }))
      await waitFor(() => {
        screen.getByRole('cell', {
            name: /shyam/i
          })
      });

      fireEvent.click(screen.getByText(/close/i));
      expect(screen.queryByRole('cell', {
        name: /shyam/i
      })).not.toBeInTheDocument()

  });

  test('Navigate to post new jobs section and check form validation', async () => {
    act(() => {
      render(<Router><EmployerContainer /></Router>);
    })

    act(() => {
    fireEvent.click(screen.getByRole('tab', {
        name: /post new job/i,
      }))
    })

    await waitFor(() => {
        screen.getByRole('textbox', {
            name: /job title/i
        })
    });

    const postJobBtn = screen.getByRole('button', {
        name: /post job/i
    })



    act(() => {
        fireEvent.click(postJobBtn);
    })

    await waitFor(() => {
        expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
    });


  });

  test('Navigate to post new jobs section and post the job', async () => {
    act(() => {
      render(<Router><EmployerContainer /></Router>);
    })

    act(() => {
    fireEvent.click(screen.getByRole('tab', {
        name: /post new job/i,
      }))
    })

    await waitFor(() => {
        screen.getByRole('textbox', {
            name: /job title/i
        })
    });

 
    act(() => {
        fireEvent.change(screen.getByRole('textbox', {
            name: /job title/i
        }), { target: { value: 'Job Title Test' } })
    })
 
    act(() => {
        fireEvent.change(screen.getByRole('textbox', {
            name: /job description/i
        }), { target: { value: 'Job Description Test' } })
    })
 
    act(() => {
        fireEvent.change(screen.getByRole('textbox', {
            name: /job requirements/i
        }), { target: { value: 'Requirement1, Requirement2' } })
    })
 
    act(() => {
        fireEvent.change(screen.getByRole('textbox', {
            name: /tags/i
        }), { target: { value: 'Tag1, Tag2' } })
    })

 
    act(() => {
        fireEvent.change(screen.getByRole('textbox', {
            name: /company name/i
        }), { target: { value: 'Company 1' } })
    })
 
    act(() => {
        fireEvent.change(screen.getByRole('textbox', {
            name: /contact info/i
        }), { target: { value: '9876543212' } })
    })
 



    act(() => {
        fireEvent.click(screen.getByRole('button', {
            name: /post job/i
        }));
    })

    await waitFor(() => {
        expect(screen.getByText(/Job Title Test/i)).toBeInTheDocument();
    });

    screen.getByText(/description: Job Description Test/i)


  });

})
