import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppLayout.scss';

export default function AppLayout (props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
