import { useCallback, useSyncExternalStore } from "react";

import {
    getPwaInstallSnapshot,
    promptPwaInstall,
    subscribeToPwaInstall,
} from "../../client/install-prompt.js";

export function usePwaInstall() {
    const installState = useSyncExternalStore(
        subscribeToPwaInstall,
        getPwaInstallSnapshot,
        getPwaInstallSnapshot,
    );

    const requestInstall = useCallback(
        () => promptPwaInstall(),
        [],
    );

    return {
        ...installState,
        requestInstall,
    };
}
