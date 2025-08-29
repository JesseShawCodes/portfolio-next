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
});
