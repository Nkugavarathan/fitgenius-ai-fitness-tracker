
package com.example.fitgenius.controller;

import com.example.fitgenius.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // frontend access
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    // Modified to return the clean text response directly
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String message = body.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Message cannot be empty"));
        }

        // Call the service which now returns the extracted text
        String responseText = aiService.chat(message);

        // Return the clean text response under the key "text"
        return ResponseEntity.ok(Map.of("text", responseText));
    }
}