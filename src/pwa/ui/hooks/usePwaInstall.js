import { useCallback, useEffect, useState } from "react";

import {
    getPwaInstallSnapshot,
    promptPwaInstall,
    subscribeToPwaInstall,
} from "../../client/install-prompt.js";

export function usePwaInstall() {
    const [installState, setInstallState] = useState(getPwaInstallSnapshot);

    useEffect(() => {
        const unsubscribe = subscribeToPwaInstall(setInstallState);

        setInstallState(getPwaInstallSnapshot());

        return unsubscribe;
    }, []);

    const requestInstall = useCallback(
        () => promptPwaInstall(),
        [],
    );

    return {
        ...installState,
        requestInstall,
    };
}
