// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver if needed by some libraries
global.IntersectionObserver = class IntersectionObserver {
    constructor(cb, options) { }
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
};
