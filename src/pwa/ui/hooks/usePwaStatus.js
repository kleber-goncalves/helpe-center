import { useCallback, useEffect, useState } from "react";

import {
    applyPwaUpdate,
    subscribeToPwaEvents,
} from "../../client/register-service-worker.js";

export function usePwaStatus() {
    const [isOnline, setIsOnline] = useState(() =>
        typeof navigator === "undefined" ? true : navigator.onLine,
    );
    const [offlineReady, setOfflineReady] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        const unsubscribe = subscribeToPwaEvents((eventName) => {
            if (eventName === "offline-ready") {
                setOfflineReady(true);
            }

            if (eventName === "update-available") {
                setNeedRefresh(true);
            }
        });

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            unsubscribe();
        };
    }, []);

    const refreshApp = useCallback(async () => {
        await applyPwaUpdate();
    }, []);

    const dismissOfflineReady = useCallback(() => {
        setOfflineReady(false);
    }, []);

    const dismissUpdate = useCallback(() => {
        setNeedRefresh(false);
    }, []);

    return {
        isOnline,
        offlineReady,
        needRefresh,
        refreshApp,
        dismissOfflineReady,
        dismissUpdate,
    };
}
