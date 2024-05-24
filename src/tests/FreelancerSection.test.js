import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FreelancerContainer from '../components/Freelancer/container';
import { BrowserRouter as Router } from 'react-router-dom';
import {act} from 'react';

global.IntersectionObserver = function(){
  this.observe= jest.fn();
      this.unobserve= jest.fn();
}

describe('renders freelancer section', () => {


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

      // Mock fetch function

    global.fetch = () => Promise.resolve({
        json: () => Promise.resolve([{name: "bort", id: 1}]), // Mock empty data
      }
    );

  });
  test('renders freelancer job listing', async () => {
    act(() => {
      render(<Router><FreelancerContainer /></Router>);
    })
    await waitFor(() => {
      screen.getByRole('columnheader', {
        name: /title search/i
      })
    });


  });

  test('freelancer profile validation', async () => {
    act(() => {
      render(<Router><FreelancerContainer /></Router>);
    })

    act(() => {
    fireEvent.click(screen.getByRole('tab', {
        name: /freelancerprofile/i,
      }))
    })

    await waitFor(() => {
      screen.getByText('Add your skills in comma seperated format')
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', {
        name: /save profile/i
      }));
    })

    await waitFor(() => {
      expect(screen.getByText(/Please enter your GitHub username/i)).toBeInTheDocument();
    });
  
    act(() => {
      fireEvent.change(screen.getByRole('textbox', {
        name: /add your skills/i
      }), { target: { value: 'skill1, skill2' } })

      fireEvent.click(screen.getByRole('button', {
        name: /list github projects/i
      }))
    });

    await waitFor(() => {
      expect(screen.getByText(/Please enter your GitHub username./i)).toBeInTheDocument();
    });
  


    act(() => {
      fireEvent.change(screen.getByRole('textbox', {
        name: /github username/i
      }), { target: { value: 'abc' } });
      fireEvent.click(screen.getByRole('button', {
        name: /list github projects/i
      }));
    })
  
  

    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: /github projects/i
      })).toBeInTheDocument();
      screen.getByText('bort')
    });
    


    

    act(() => {
      fireEvent.click(screen.getByRole('button', {
        name: /save profile/i
      }));
    })

    await waitFor(() => {
      expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
    });


  });

})
