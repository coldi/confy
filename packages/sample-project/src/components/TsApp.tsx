import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from './AppLayout';

function useMyMountedTest() {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(current => !current);
    }, []);

    return state;
}

function useMyMemoTest<T>(data: T) {
    return useMemo(() => data, [data]);
}

export default function TsApp() {
    const label = useMyMemoTest<string>('React and TypeScript');
    const mounted = useMyMountedTest();

    return (
        <AppLayout>
            <p>This stuff is running with {label}.</p>
            <p>Mounted: {mounted ? 'yes' : 'no'}</p>
        </AppLayout>
    );
}
