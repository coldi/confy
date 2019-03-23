/* eslint-disable  no-undef */
import React from 'react';
import Enzyme from 'enzyme';
import App from './App';

describe('components/App', () => {
    let renderedElement;

    const renderComponent = () => {
        renderedElement = Enzyme.shallow(<App />);
    };

    beforeEach(() => {
        renderComponent();
    });

    describe('Given the component was mounted to the DOM', () => {
        it('should contain AppLayout', () => {
            expect(renderedElement.find('AppLayout').length).toBe(1);
        });
    });
});
