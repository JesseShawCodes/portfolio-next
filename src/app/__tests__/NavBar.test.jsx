
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

jest.mock('../components/ThemeToggleButton', () => () => <div data-testid="theme-toggle-button-mock"></div>);
jest.mock('../components/NavLink', () => ({ name, link }) => <a href={link}>{name}</a>);

describe('NavBar', () => {
  // Set up the environment variable before running the tests
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_NAME: 'Jesse Shaw',
      NEXT_PUBLIC_API_ROOT_MEDIA: 'test.com'
    };
  });

  afterEach(() => {
    // Restore the original environment variables after all tests
    process.env = originalEnv;
  });

  it('renders the NavBar with brand, navigation links, and theme toggle button', () => {
    render(<NavBar />);

    // Check for the brand name
    expect(screen.getByText('Jesse Shaw')).toBeInTheDocument();

    // Check for the logo
    const logo = screen.getByAltText('Jesse Shaw portfolio logo');
    expect(logo).toBeInTheDocument();


    // Check for navigation links
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();

    // Check for the mocked ThemeToggleButton
    expect(screen.getByTestId('theme-toggle-button-mock')).toBeInTheDocument();
  });
});
