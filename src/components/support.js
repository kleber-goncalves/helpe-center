const SUPPORT_ENDPOINT = import.meta.env.VITE_SUPPORT_ENDPOINT;

if (!SUPPORT_ENDPOINT) {
    throw new Error("VITE_SUPPORT_ENDPOINT não foi configurada.");
}

export { SUPPORT_ENDPOINT };
