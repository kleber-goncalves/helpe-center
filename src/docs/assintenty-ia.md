MVP Gemini 3.5 Flash-Lite. Hoje ele aparece na documentação oficial com entrada e saída sem custo financeiro no Free Tier. A Google também recomenda o SDK oficial @google/genai para Node.js.

A estrutura:

React
   ↓
POST /api/assistant
   ↓
searchTutorials()
   ↓
top 3 tutoriais
   ↓
Gemini 3.5 Flash-Lite
   ↓
resposta


{suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => handleSuggestion(suggestion)}
                                    className="
                                            rounded-lg
                                            border
                                            border-line
                                            bg-background
                                            px-3
                                            py-2
                                            text-left
                                            text-sm
                                            font-semibold
                                            text-ink
                                            transition-colors
                                            hover:border-coral
                                            hover:text-coral
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-coral
                                        "
                                >
                                    {suggestion}
                                </button>
                            ))}