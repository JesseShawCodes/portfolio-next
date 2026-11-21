import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { getLocale } from '../../config/locale';

jest.mock('../components/ThemeToggleButton', () => {
  function ThemeToggleButtonMock() {
    return <div data-testid="theme-toggle-button-mock"></div>;
  }
  return ThemeToggleButtonMock;
});
jest.mock('../components/NavLink', () => {
  function NavLinkMock({ name, link }) {
    return <a href={link}>{name}</a>;
  }
  return NavLinkMock;
});

describe('NavBar', () => {
  const originalEnv = process.env;
  const { site } = getLocale();

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders the NavBar with brand, navigation links, and theme toggle button', () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_NAME: 'Jesse Shaw',
      NEXT_PUBLIC_API_ROOT_MEDIA: 'test.com',
    };

    render(<NavBar />);

    expect(screen.getByText('Jesse Shaw')).toBeInTheDocument();
    expect(screen.getByAltText('Jesse Shaw portfolio logo')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('falls back to the locale site name when NEXT_PUBLIC_NAME is unset', () => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_NAME;

    render(<NavBar />);

    expect(screen.getByText(site.name)).toBeInTheDocument();
  });
});
