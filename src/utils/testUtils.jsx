import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import { LoadingProvider } from '../context/LoadingContext';

// Custom render function that wraps components with necessary providers
const customRender = (ui, options) => {
    const Wrapper = ({ children }) => {
        return (
            <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <LoadingProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </LoadingProvider>
            </BrowserRouter>
        );
    };

    return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
