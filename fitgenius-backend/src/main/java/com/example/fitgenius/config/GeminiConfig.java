
package com.example.fitgenius.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GeminiConfig {

    @Bean
    public WebClient geminiWebClient(WebClient.Builder builder,
                                     @Value("${gemini.api.base.url}") String baseUrl) {
        // The WebClient is correctly built with the base URL.
        // Ensure gemini.api.base.url is set in application.properties/yml!
        return builder
                .baseUrl(baseUrl)
                .build();
    }


}