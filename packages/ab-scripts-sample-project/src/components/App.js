import React from 'react';
import { hot } from 'react-hot-loader/root';
import AppLayout from './AppLayout';
import { ReactComponent as ReactLogo } from '../assets/react-logo.svg';

/* eslint-disable  react/prefer-stateless-function */
export default hot(
    class App extends React.Component {
        render() {
            return (
                <AppLayout>
                    <p>This stuff is running with React.</p>
                    <p>
                        <ReactLogo height={100} />
                    </p>
                </AppLayout>
            );
        }
    }
);
