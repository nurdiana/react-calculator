import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator app', () => {
  render(<App />);
  const linkElement = screen.getByText(/hasil/i);
  expect(linkElement).toBeInTheDocument();
});