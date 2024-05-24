import { render, screen } from '@testing-library/react';
import NotFoundComponent from '../components/NotFoundPage/index.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

describe('NotFoundPage', () => {
  test('renders 404 message', () => {
    render(
      <Router>
        <NotFoundComponent />
      </Router>

    );

    const titleElement = screen.getByText(/404/i);
    expect(titleElement).toBeInTheDocument();

    const subTitleElement = screen.getByText(/Sorry, the page you visited does not exist./i);
    expect(subTitleElement).toBeInTheDocument();
  });

  test('renders Back Home button', () => {
    render(
      <Router>
        <NotFoundComponent />
      </Router>
    );

    const backButtonElement = screen.getByRole('link', { name: /back home/i });
    expect(backButtonElement).toBeInTheDocument();
  });
});






