import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from './App';
import AppLayout from './AppLayout';

describe('components/App', () => {
    let renderedElement;

    const renderComponent = () => {
        renderedElement = TestRenderer.create(<App />).root;
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('Given the component was mounted to the DOM', () => {
        it('should contain AppLayout', () => {
            expect(renderedElement.findByType(AppLayout)).toBeTruthy();
        });
    });
});
