import { render, screen } from '@testing-library/react';
import HomePage from "../pages/HomePage";

describe('Home', () => {
    it('should have a heading that reads `My name is Jesse. I am a Full Stack Developer`', () => {
        render(<HomePage />);
        const heading = screen.getByRole('heading', { name: "My name is Jesse. I am a Full Stack Developer" });
        expect(heading).toBeInTheDocument();
    });
});
