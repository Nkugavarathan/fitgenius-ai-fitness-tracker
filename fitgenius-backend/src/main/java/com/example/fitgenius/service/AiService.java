
package com.example.fitgenius.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;


import static com.example.fitgenius.service.GeminiResponse.*;


@Service
@RequiredArgsConstructor
public class AiService {

    private final WebClient geminiWebClient;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model:gemini-2.5-flash}")
    private String geminiModel;

    private static final String SYSTEM_PROMPT = """
        You are a friendly fitness coach chatbot.
        Respond ONLY in clean plain text. 
        Do NOT use Markdown formatting such as **bold**, *, underscores, backticks, or bullet points.
        Use simple numbered steps or clean line breaks only.
        
        - If the user asks for a workout plan, generate a structured plan in plain text.
        - If the user asks for motivation, give an encouraging response.
        - If the user asks a general fitness question, answer clearly.
        - Always reply in a concise, coach-like tone.
        """;

    public String chat(String userMessage) {

        // 1. Structure the user message and system instruction using the record models
        Content userContent = new Content(List.of(new Part(userMessage)));
        SystemInstruction systemInst = new SystemInstruction(List.of(new Part(SYSTEM_PROMPT)));

        // 2. Create the complete request body
        GeminiRequest requestBody = new GeminiRequest(
                List.of(userContent),
                systemInst
        );

        try {

            return geminiWebClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/models/" + geminiModel + ":generateContent")
                            .queryParam("key", geminiApiKey)
                            .build()
                    )
                    .bodyValue(requestBody)
                    .retrieve()
                    // 3. Map the response JSON to our structured class (Mono<GeminiResponse>)
                    .bodyToMono(GeminiResponse.class)
                    // 4. VITAL STEP: Convert the response object to the final String (Mono<String>)
                    .map(GeminiResponse::getGeneratedText)
                    .doOnError(e ->
                            System.err.println("Error calling Gemini API: " + e.getMessage()))
                    .onErrorResume(e -> {
                        System.err.println("Gemini API call failed: " + e.getMessage());
                        // 5. Return a Mono<String> here to match the stream type
                        return Mono.just("ERROR: Could not connect to the AI service. Please check API key and URL.");
                    })
                    .block();

        } catch (Exception e) {
            System.err.println("AI Service exception: " + e.getMessage());
            return "ERROR: Service temporarily unavailable or configuration error.";
        }
    }
}