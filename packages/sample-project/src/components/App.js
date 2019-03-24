import React from 'react';
import { hot } from 'react-hot-loader/root';
import AppLayout from './AppLayout';
import { ReactComponent as ReactLogo } from '../assets/react-logo.svg';

export default hot(function App() {
    return (
        <AppLayout>
            <p>This stuff is running with React.</p>
            <p>
                <ReactLogo height={100} />
            </p>
        </AppLayout>
    );
});
