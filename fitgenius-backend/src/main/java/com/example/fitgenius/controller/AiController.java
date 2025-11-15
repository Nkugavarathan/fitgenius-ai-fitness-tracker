//package com.example.fitgenius.controller;//package com.example.fitgenius.controller;//package com.example.fitgenius.controller;
////
////import com.example.fitgenius.service.AiService;
////import lombok.RequiredArgsConstructor;
////import org.springframework.web.bind.annotation.*;
////
////import java.util.List;
////import java.util.Map;
////
////@RestController
////@RequestMapping("/api/ai")
////@RequiredArgsConstructor
////@CrossOrigin(origins = "http://localhost:5173") // update for your frontend URL
////public class AiController {
////
////    private final AiService aiService;
//
//
///** POST /api/ai/plan
//     * Expects JSON: { "goal": "...", "time": "...", "equipment": "..." } */
////    @PostMapping("/plan")
////    public String generatePlan(@RequestBody Map<String, String> body) {
////        String goal = body.getOrDefault("goal", null);
////        String time = body.getOrDefault("time", null);
////        String equipment = body.getOrDefault("equipment", null);
////        return aiService.generatePlan(goal, time, equipment);
////    }
////
////    /** POST /api/ai/auto-coach
////     * Expects JSON: { "workouts": [ { "exerciseName":"...", "sets":2, "reps":10, "date":"..." }, ... ] } */
////    @PostMapping("/auto-coach")
////    public String autoCoach(@RequestBody Map<String, Object> body) {
////        return aiService.generateAutoInsights(body);
////    }
////
////    /** POST /api/ai/chat
////     * Expects JSON: { "message": "..." } */
////    @PostMapping("/chat")
////    public String chatTrainer(@RequestBody Map<String, String> body) {
////        String message = body.getOrDefault("message", "");
////        return aiService.chatTrainer(message);
////    }
////}
//
////package com.example.fitgenius.controller;
////
////import com.example.fitgenius.service.AiService;
////import lombok.RequiredArgsConstructor;
////import org.springframework.web.bind.annotation.*;
////
////import java.util.Map;
////
////    @RestController
////    @RequestMapping("/api/ai")
////    @RequiredArgsConstructor
////    public class AiController {
////
////        private final AiService aiService;
////
////        /** POST /api/ai/plan
////         * Expects JSON: { "goal":"...", "time":"...", "equipment":"..." } */
////        @PostMapping("/plan")
////        public String generatePlan(@RequestBody Map<String, String> body) {
////            String goal = body.getOrDefault("goal", null);
////            String time = body.getOrDefault("time", null);
////            String equipment = body.getOrDefault("equipment", null);
////            return aiService.generatePlan(goal, time, equipment);
////        }
////
////        /** POST /api/ai/auto-coach
////         * Expects JSON: { "workouts": [ { "exerciseName":"...", "sets":2, "reps":10, "date":"..." }, ... ] } */
////        @PostMapping("/auto-coach")
////        public String autoCoach(@RequestBody Map<String, Object> body) {
////            return aiService.generateAutoInsights(body);
////        }
////
////        /** POST /api/ai/chat
////         * Expects JSON: { "message": "..." } */
////        @PostMapping("/chat")
////        public String chatTrainer(@RequestBody Map<String, String> body) {
////            String message = body.getOrDefault("message", "");
////            return aiService.chatTrainer(message);
////        }
////    }
////
////
////
////import com.example.fitgenius.service.AiService;
////import lombok.RequiredArgsConstructor;
////import org.springframework.web.bind.annotation.PostMapping;
////import org.springframework.web.bind.annotation.RequestBody;
////import org.springframework.web.bind.annotation.RequestMapping;
////import org.springframework.web.bind.annotation.RestController;
////
////import java.util.Map;
////
////@RestController
////    @RequestMapping("/api/ai")
////    @RequiredArgsConstructor
////    public class AiController {
////
////        private final AiService aiService;
////
////        @PostMapping("/plan")
////        public String generatePlan(@RequestBody Map<String, String> body) {
////            return aiService.generatePlan(
////                    body.getOrDefault("goal", null),
////                    body.getOrDefault("time", null),
////                    body.getOrDefault("equipment", null)
////            );
////        }
////
////        @PostMapping("/auto-coach")
////        public String autoCoach(@RequestBody Map<String, Object> body) {
////            return aiService.generateAutoInsights(body);
////        }
////
////        @PostMapping("/chat")
////        public String chatTrainer(@RequestBody Map<String, String> body) {
////            return aiService.chatTrainer(body.getOrDefault("message", ""));
////        }
////    }
////
//
//
//import com.example.fitgenius.service.AiService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/ai")
//@RequiredArgsConstructor
//public class AiController {
//
//    private final AiService aiService;
//
//    @PostMapping("/chat")
//    public String chat(@RequestBody Map<String, String> body) {
//        return aiService.chat(body.getOrDefault("message", ""));
//    }
//}
//
//package com.example.fitgenius.controller;
//
//import com.example.fitgenius.service.AiService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/ai")
//@RequiredArgsConstructor
//public class AiController {
//
//    private final AiService aiService;
//
//    @PostMapping("/chat")
//    public String chat(@RequestBody Map<String, String> body) {
//        return aiService.chat(body.getOrDefault("message", ""));
//    }
//}

//package com.example.fitgenius.controller;
//
//import com.example.fitgenius.service.AiService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/ai")
//@RequiredArgsConstructor
//public class AiController {
//
//    private final AiService aiService;
//
//    @PostMapping("/chat")
//    public String chat(@RequestBody Map<String, String> body) {
//        return aiService.chat(body.getOrDefault("message", ""));
//    }
//}
//
package com.example.fitgenius.controller;

import com.example.fitgenius.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Add this for frontend access
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String message = body.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Message cannot be empty"));
        }

        String response = aiService.chat(message);
        System.out.println("Sending request to Gemini...");
        System.out.println("Request body: " + body);
        return ResponseEntity.ok(Map.of("response", response));
    }
}