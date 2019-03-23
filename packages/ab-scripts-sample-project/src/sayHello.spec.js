/* eslint-disable  no-undef */
import sayHello from './sayHello';

describe('sayHello', () => {
    it('should say hello to Jest', () => {
        const name = 'Jest';
        expect(sayHello(name)).toBe(`Hello, ${name}!`);
    });
});
