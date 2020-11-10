import React from 'react';
import AppLayout from './AppLayout';
import { ReactComponent as ReactLogo } from '../assets/react-logo.svg';

export default function App() {
    return (
        <AppLayout>
            <p>This stuff is running with React.</p>
            <p>
                <ReactLogo height={100} />
            </p>
        </AppLayout>
    );
}
