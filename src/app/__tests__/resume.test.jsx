import { render, screen } from '@testing-library/react';
import ResumePage from '../resume/page';

// Mock the fetch function
global.fetch = jest.fn((url) => {
    if (url.includes('work-experiences')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: [
                    {
                        title: 'Junior Web Developer',
                        company: 'Test Company',
                        startdate: '2021-01-01',
                        enddate: '2022-01-01',
                        description: 'Test description',
                        technologies: ['React', 'Node.js'],
                    },
                    {
                        title: 'Senior Web Developer',
                        company: 'Test Company',
                        startdate: '2022-01-01',
                        enddate: '2023-01-01',
                        description: 'Test description',
                        technologies: ['React', 'Node.js'],
                    },
                ],
            }),
        });
    }
    if (url.includes('educations')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: [
                    {
                        schoolName: 'Test University',
                        degree: 'Bachelor of Science',
                        field: 'Computer Science',
                        startDate: '2017-09-01',
                        endDate: '2020-05-01',
                    },
                    {
                        schoolName: 'Test University',
                        degree: 'Master of Science',
                        field: 'Computer Science',
                        startDate: '2020-09-01',
                        endDate: '2022-05-01',
                    },
                ],
            }),
        });
    }
});

jest.mock('react-markdown', () => (props) => {
  return <div data-testid="mock-markdown">{props.children}</div>;
});

describe('Resume Page', () => {
    it('should render the correct heading',  async () => {
        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        // Assert that the page title is rendered
        const title = screen.getByRole('heading', { name: /Resume/i });
        expect(title).toBeInTheDocument();
    });

    it('should render the work experience title', async () => {
        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        const workExperienceTitle = screen.getByRole('heading', { name: /Senior Web Developer/i });
        expect(workExperienceTitle).toBeInTheDocument();
    });

    it('should sort the work experience by start date', async () => {
        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        const workExperienceTitles = screen.getAllByRole('heading', { level: 2 });
        expect(workExperienceTitles[1]).toHaveTextContent('Senior Web Developer');
        expect(workExperienceTitles[2]).toHaveTextContent('Junior Web Developer');
    });

    it('should render the education title', async () => {
        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        const educationTitle = screen.getByText(/Master of Science/i);
        expect(educationTitle).toBeInTheDocument();
    });

    it('should sort the education by start date', async () => {
        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        const educationDegrees = screen.getAllByText(/((Master)|(Bachelor)) of Science/i);
        expect(educationDegrees[0]).toHaveTextContent('Master of Science');
        expect(educationDegrees[1]).toHaveTextContent('Bachelor of Science');
    });

    it('should not render work experience when there is no data', async () => {
        global.fetch.mockImplementation((url) => {
            if (url.includes('work-experiences')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
            }
            if (url.includes('educations')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
            }
        });

        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        const workExperienceTitle = screen.queryByRole('heading', { name: /Senior Web Developer/i });
        expect(workExperienceTitle).not.toBeInTheDocument();
    });

    it('should not render education when there is no data', async () => {
        global.fetch.mockImplementation((url) => {
            if (url.includes('work-experiences')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
            }
            if (url.includes('educations')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
            }
        });

        const pageContent = await ResumePage({ pageHeading: 'Resume' });
        
        render(pageContent);

        const educationTitle = screen.queryByText(/Master of Science/i);
        expect(educationTitle).not.toBeInTheDocument();
    });
});
