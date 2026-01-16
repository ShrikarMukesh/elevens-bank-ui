import React from 'react';
import { render, screen, fireEvent } from '../../utils/testUtils';
import Login from '../Login';
import { AuthAPI } from '../../api/authApi';

// Mock the AuthAPI
jest.mock('../../api/authApi');

// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Login Page', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    test('renders login form correctly', () => {
        render(<Login />);

        expect(screen.getByRole('heading', { level: 1, name: /Elevens Bank Login/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('handles user input', () => {
        render(<Login />);

        const usernameInput = screen.getByPlaceholderText(/Username/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password123');
    });

    test('calls login api on submit', async () => {
        // Setup mock response
        AuthAPI.login.mockResolvedValue({
            data: {
                accessToken: 'fake-token',
                refreshToken: 'fake-refresh-token',
                user: { userId: 1, username: 'testuser', role: 'USER' }
            }
        });

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Since handleSubmit is async and we don't await usage in the component easily here without finding an element that appears
        // We can just check if called. In real world we would await waitFor(() => expect(...))
        // But for this basic test infrastructure setup:
        expect(AuthAPI.login).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    });

    // Note: More complex tests involving submitting would require awaiting async actions and mocking the API response properly
});
