import { render, screen } from '@testing-library/react';
import App from './App';

test('sign in on landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign in/i);
  expect(linkElement).toBeInTheDocument();
});
