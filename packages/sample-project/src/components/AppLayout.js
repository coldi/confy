import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppLayout.scss';

export default function AppLayout ({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
