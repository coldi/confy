import React from 'react';
import { hot } from 'react-hot-loader/root';

// hot(App) is only required for the root component.
export default hot(function App() {
    return (
        <div>
            <h1>Rendered with React.</h1>
            <p>
                Open <code>src/components/App.js</code> to edit this view.
            </p>
        </div>
    );
});
