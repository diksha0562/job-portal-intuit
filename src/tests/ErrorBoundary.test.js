import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import {act} from 'react';

const MyDummyComponent = ({ throwError }) => {
    if (throwError) {
      throw new Error('Test error');
    }
    return <div>Hello</div>;
  };

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <MyDummyComponent />
      </ErrorBoundary>
    );
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('displays fallback UI when error is thrown', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <ErrorBoundary>
        <MyDummyComponent throwError />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong.')).toBeInTheDocument();
  });
});