import { render, screen } from '@testing-library/react';
import ResumePage from '../resume/page';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            data: [{ /* your mock data here */ }]
        }),
    })
);

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
});
