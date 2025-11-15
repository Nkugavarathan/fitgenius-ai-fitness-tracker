//package com.example.fitgenius.config;
//
//import com.openai.client.OpenAIClient;
//import com.openai.client.okhttp.OpenAIOkHttpClient;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class OpenAiConfig {
//
//    @Value("${gemini-api-key}")
//    private String openaiApiKey;
//
//    @Bean
//    public OpenAIClient openAIClient() {
//        return com.openai.client.okhttp.OpenAIOkHttpClient.builder()
//                .apiKey(openaiApiKey)
//                .build();
//    }
//}
//package com.example.fitgenius.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.reactive.function.client.WebClient;
//
//@Configuration
//public class GeminiConfig {
//
//    @Value("${gemini-api-key}")
//    private String geminiApiKey;
//
//    @Bean
//    public WebClient geminiWebClient() {
//        return WebClient.builder()
//                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
//                .defaultHeader("Authorization", "Bearer " + geminiApiKey)
//                .defaultHeader("Content-Type", "application/json")
//                .build();
//    }
//}


package com.example.fitgenius.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GeminiConfig {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.base-url}")
    private String geminiBaseUrl;

    @Bean
    public WebClient geminiWebClient() {
        return WebClient.builder()
                .baseUrl(geminiBaseUrl)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}