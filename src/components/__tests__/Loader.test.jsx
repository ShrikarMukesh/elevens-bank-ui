import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader Component', () => {
    test('renders inline loader by default', () => {
        render(<Loader />);
        const loader = screen.getByRole('status', { hidden: true }); // Tailwind animate-spin might rely on visuals, but let's check class presence or structure
        // Since we don't have role="status" explicitly in Loader.jsx
        // Let's modify Loader.jsx to have role="status" for better testing/accessibility first or just search by text "Loading..." if present

        // Actually, inline loader doesn't have text. It has a div with animate-spin.
        // Let's find by class presence using container
        const { container } = render(<Loader />);
        expect(container.firstChild).toHaveClass('flex items-center justify-center p-4');
        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    });

    test('renders full screen loader with text', () => {
        render(<Loader fullScreen={true} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toHaveClass('animate-pulse');
    });
});
