import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {act} from 'react';
import App from '../App.tsx';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));


describe('renders login form', () => {


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
  test('renders login form and validate input field for employer', async () => {
    act(() => {
      render(<App />);
    })

    const loginBtn = screen.getByRole('button', {
      name: "Login",
    })

    act(() => {
      fireEvent.click(loginBtn);
    })

    await waitFor(() => {
      expect(screen.getByText(
        "Please enter your email"
      )).toBeInTheDocument();
    });
    screen.getByText('Please enter your password');


  });

  test('navigate to employer profile', async () => {
    act(() => {
      render(<App />);
    })
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'testEmail@abc.com' } })
    })
    const pwdInput = screen.getByLabelText('Password');
    act(() => {
      fireEvent.change(pwdInput, { target: { value: 'testPwd9099' } })
    })

    const loginBtn = screen.getByRole('button', {
      name: "Login",
    })

    act(() => {
      fireEvent.click(loginBtn);
    })
    await waitFor(() => {
      expect(mockUsedNavigate).toHaveBeenCalledWith('/employer')
    });

  })
  test('navigate to freelancer profile', async () => {
    act(() => {
      render(<App />);
    })
    const freeLancerTab = screen.getByRole('tab', {
      name: "Freelancer",
    })

    fireEvent.click(freeLancerTab)
    const emailInput = screen.getByLabelText('Freelancer Email');
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'testEmail@sd.com' } })
    })
    const pwdInput = screen.getByLabelText('Freelancer Password');
    act(() => {
      fireEvent.change(pwdInput, { target: { value: 'testPwd9099' } })
    })

    const loginBtn = screen.getByRole('button', {
      name: "Login",
    })

    act(() => {
      fireEvent.click(loginBtn);
    })
    await waitFor(() => {
      expect(mockUsedNavigate).toHaveBeenCalledWith('/freelancer')
    });

  })
  test('renders login form and validate input field for freelancer', async () => {
    act(() => {
      render(<App />);
    })


    const freeLancerTab = screen.getByRole('tab', {
      name: "Freelancer",
    })

    fireEvent.click(freeLancerTab)

    const loginBtn = screen.getByRole('button', {
      name: "Login",
    })

    act(() => {
      fireEvent.click(loginBtn);
    })

    await waitFor(() => {
      expect(screen.getByText(
        "Please enter your email"
      )).toBeInTheDocument();
    });
    screen.getByText('Please enter your password');


  });


})
