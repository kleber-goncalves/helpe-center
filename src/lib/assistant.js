export async function askAssistant(message, signal) {
    const value = String(message ?? "").trim();

    if (!value) {
        throw new Error("Digite uma dúvida.");
    }

    const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: value,
        }),
        signal,
    });

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error("Não foi possível interpretar a resposta.");
    }

    if (!response.ok || data.ok !== true) {
        throw new Error(data.error || "Não foi possível obter uma resposta.");
    }

    return data;
}
