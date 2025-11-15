////
////package com.example.fitgenius.service;
////
////import com.openai.client.OpenAIClient;
////import com.openai.models.responses.Response;
////import com.openai.models.responses.ResponseCreateParams;
////import org.jetbrains.annotations.NotNull;
////import org.springframework.beans.factory.annotation.Value;
////import org.springframework.stereotype.Service;
////
////import java.util.List;
////import java.util.Map;
////import java.util.stream.Collectors;
////
////@Service
////public class AiService {
////
////    private final OpenAIClient client;
////    private final String model;
////
////    public AiService(OpenAIClient client,
////                     @Value("${openai.model:gpt-4o-mini}") String model) {
////        this.client = client;
////        this.model = model;
////    }
////
////    /**
////     * 1) Prompt-based plan generator (Phase1 style)
////     */
////    public String generatePlan(String goal, String minutes, String equipment) {
////        String prompt = buildPlanPrompt(goal, minutes, equipment);
////
////        ResponseCreateParams params = ResponseCreateParams.builder()
////                .model(model)
////                .input(prompt)
////                .maxOutputTokens(800)   // tune as needed
////                .temperature(0.7)
////                .build();
////
////        Response response = client.responses().create(params);
////        return response.outputText();
////    }
////
////    /**
////     * 2) Auto-Coach - analyzes user's workouts (list of maps)
////     * We can either compute lightweight metrics here and ask model to produce motivational tips,
////     * or produce local rules + augment with the model. We'll do a combined approach:
////     */
////    @SuppressWarnings("unchecked")
////    public String generateAutoInsights(Map<String, Object> payload) {
////        // payload expected: { "workouts": [ {exerciseName, sets, reps, date, ...}, ... ] }
////        List<Map<String, Object>> workouts = (List<Map<String, Object>>) payload.get("workouts");
////
////        if (workouts == null || workouts.isEmpty()) {
////            return "No workouts found — keep logging your sessions and I'll analyze them!";
////        }
////
////        // simple local analysis: group by date, compute volume (sets*reps), compute recent trend
////        List<Map<String, Object>> sorted = workouts.stream()
////                .sorted((a, b) -> ((String)a.get("date")).compareTo((String)b.get("date"))) // assumes ISO date string
////                .toList();
////
////        int totalVolume = 0;
////        int recentVolume = 0;
////        int prevVolume = 0;
////
////        for (int i = 0; i < sorted.size(); i++) {
////            Map<String, Object> w = sorted.get(i);
////            int sets = toInt(w.get("sets"));
////            int reps = toInt(w.get("reps"));
////            int v = sets * reps;
////            totalVolume += v;
////            if (i == sorted.size() - 1) recentVolume = v;
////            if (i == sorted.size() - 2) prevVolume = v;
////        }
////
////        String prompt = getPrompt(prevVolume, recentVolume, sorted);
////
////        ResponseCreateParams params = ResponseCreateParams.builder()
////                .model(model)
////                .input(prompt)
////                .maxOutputTokens(300)
////                .temperature(0.8)
////                .build();
////
////        Response response = client.responses().create(params);
////        return response.outputText();
////    }
////
////    @NotNull
////    private static String getPrompt(int prevVolume, int recentVolume, List<Map<String, Object>> sorted) {
////        double percentChange = (prevVolume == 0) ? 0 : ((recentVolume - prevVolume) * 100.0 / prevVolume);
////
////        // Build a compact summary to pass to the model
////        String summary = String.format(
////                "Total sessions: %d. Most recent session volume: %d. Previous session volume: %d. Volume change: %.1f%%.",
////                sorted.size(), recentVolume, prevVolume, percentChange);
////
////        String prompt = "You are a friendly fitness coach. Based on the following user workout summary and recent sessions, "
////                + "provide a short, encouraging analysis (2-4 short bullets) and one practical suggestion. Use friendly motivator tone.\n\n"
////                + "Summary: " + summary + "\n\n"
////                + "Recent workouts (most recent last):\n";
////
////        // attach last N sessions (safe size)
////        int start = Math.max(0, sorted.size() - 6);
////        for (int i = start; i < sorted.size(); i++) {
////            Map<String, Object> w = sorted.get(i);
////            prompt += String.format("- %s | %ss x %sr (date: %s)\n",
////                    w.getOrDefault("exerciseName","unknown"),
////                    w.getOrDefault("sets","?"),
////                    w.getOrDefault("reps","?"),
////                    w.getOrDefault("date","?"));
////        }
////
////        prompt += "\nRespond with short bullets and a one-line encouraging closer.";
////        return prompt;
////    }
////
////
////    /**
////     * 3) Chat Trainer - single turn chat (can be extended to multi-turn by storing context)
////     */
////    public String chatTrainer(String userMessage) {
////        String prompt = "You are a friendly fitness coach and trainer. Reply in an encouraging, short tone. If the user asks for a workout plan, ask clarifying questions if needed.\n\nUser: "
////                + userMessage + "\n\nCoach:";
////
////        ResponseCreateParams params = ResponseCreateParams.builder()
////                .model(model)
////                .input(prompt)
////                .temperature(0.85)
////                .maxOutputTokens(400)
////                .build();
////
////        Response response = client.responses().create(params);
////        return response.outputText();
////    }
////
////    // small helper
////    private static int toInt(Object o) {
////        if (o == null) return 0;
////        if (o instanceof Number) return ((Number) o).intValue();
////        try { return Integer.parseInt(o.toString()); } catch (Exception e) {return 0;}
////    }
////
////    private String buildPlanPrompt(String goal, String minutes, String equipment) {
////        return "You are a friendly fitness coach. Create a 5-day workout plan for the user.\n"
////                + "Goal: " + (goal == null ? "General fitness" : goal) + "\n"
////                + "Daily time (minutes): " + (minutes == null ? "30" : minutes) + "\n"
////                + "Equipment: " + (equipment == null || equipment.isBlank() ? "bodyweight" : equipment) + "\n\n"
////                + "Constraints: beginner friendly, safe progressions, include full warm-up and cool-down. Provide day-by-day plan with exercise names, sets, and reps.\n"
////                + "Tone: friendly motivator. Keep plan concise (max 300 tokens).";
////    }
////}
//
////
////
////package com.example.fitgenius.service;
////
////import com.openai.client.OpenAIClient;
////import com.openai.models.responses.Response;
////import com.openai.models.responses.ResponseCreateParams;
////import org.jetbrains.annotations.NotNull;
////import org.springframework.beans.factory.annotation.Value;
////import org.springframework.stereotype.Service;
////
////import java.util.List;
////import java.util.Map;
////import java.util.stream.Collectors;
////
////@Service
////public class AiService {
////
////    private final OpenAIClient client;
////    private final String model;
////
////    public AiService(OpenAIClient client,
////                     @Value("${openai.model:gpt-4o-mini}") String model) {
////        this.client = client;
////        this.model = model;
////    }
////
////    /** 1) Plan generator */
////    public String generatePlan(String goal, String minutes, String equipment) {
////        String prompt = buildPlanPrompt(goal, minutes, equipment);
////
////        ResponseCreateParams params = ResponseCreateParams.builder()
////                .model(model)
////                .input(prompt)
////                .maxOutputTokens(800)
////                .temperature(0.7)
////                .build();
////
////        Response response = client.responses().create(params);
////        return extractText(response);
////    }
////
////    /** 2) Auto-Coach analysis */
////    @SuppressWarnings("unchecked")
////    public String generateAutoInsights(Map<String, Object> payload) {
////        List<Map<String, Object>> workouts = (List<Map<String, Object>>) payload.get("workouts");
////        if (workouts == null || workouts.isEmpty()) {
////            return "No workouts found — keep logging your sessions and I'll analyze them!";
////        }
////
////        List<Map<String, Object>> sorted = workouts.stream()
////                .sorted((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")))
////                .toList();
////
////        int totalVolume = 0, recentVolume = 0, prevVolume = 0;
////        for (int i = 0; i < sorted.size(); i++) {
////            Map<String, Object> w = sorted.get(i);
////            int sets = toInt(w.get("sets"));
////            int reps = toInt(w.get("reps"));
////            int v = sets * reps;
////            totalVolume += v;
////            if (i == sorted.size() - 1) recentVolume = v;
////            if (i == sorted.size() - 2) prevVolume = v;
////        }
////
////        String prompt = getPrompt(prevVolume, recentVolume, sorted);
////
////        ResponseCreateParams params = ResponseCreateParams.builder()
////                .model(model)
////                .input(prompt)
////                .maxOutputTokens(300)
////                .temperature(0.8)
////                .build();
////
////        Response response = client.responses().create(params);
////        return extractText(response);
////    }
////
////    /** 3) Chat Trainer */
////    public String chatTrainer(String userMessage) {
////        String prompt = "You are a friendly fitness coach and trainer. Reply in an encouraging, short tone. " +
////                "If the user asks for a workout plan, ask clarifying questions if needed.\n\nUser: " + userMessage + "\n\nCoach:";
////
////        ResponseCreateParams params = ResponseCreateParams.builder()
////                .model(model)
////                .input(prompt)
////                .temperature(0.85)
////                .maxOutputTokens(400)
////                .build();
////
////        Response response = client.responses().create(params);
////        return extractText(response);
////    }
////
////    /** Helper: safely convert object to int */
////    private static int toInt(Object o) {
////        if (o == null) return 0;
////        if (o instanceof Number) return ((Number) o).intValue();
////        try { return Integer.parseInt(o.toString()); } catch (Exception e) {return 0;}
////    }
////
////    /** Build prompt for plan generator */
////    private String buildPlanPrompt(String goal, String minutes, String equipment) {
////        return "You are a friendly fitness coach. Create a 5-day workout plan for the user.\n"
////                + "Goal: " + (goal == null ? "General fitness" : goal) + "\n"
////                + "Daily time (minutes): " + (minutes == null ? "30" : minutes) + "\n"
////                + "Equipment: " + (equipment == null || equipment.isBlank() ? "bodyweight" : equipment) + "\n\n"
////                + "Constraints: beginner friendly, safe progressions, include full warm-up and cool-down. Provide day-by-day plan with exercise names, sets, and reps.\n"
////                + "Tone: friendly motivator. Keep plan concise (max 300 tokens).";
////    }
////
////    /** Build prompt for auto-coach */
////    @NotNull
////    private static String getPrompt(int prevVolume, int recentVolume, List<Map<String, Object>> sorted) {
////        double percentChange = (prevVolume == 0) ? 0 : ((recentVolume - prevVolume) * 100.0 / prevVolume);
////
////        String summary = String.format(
////                "Total sessions: %d. Most recent session volume: %d. Previous session volume: %d. Volume change: %.1f%%.",
////                sorted.size(), recentVolume, prevVolume, percentChange);
////
////        String prompt = "You are a friendly fitness coach. Based on the following user workout summary, "
////                + "provide a short, encouraging analysis (2-4 bullets) and one practical suggestion.\n\n"
////                + "Summary: " + summary + "\n\n"
////                + "Recent workouts (most recent last):\n";
////
////        int start = Math.max(0, sorted.size() - 6);
////        for (int i = start; i < sorted.size(); i++) {
////            Map<String, Object> w = sorted.get(i);
////            prompt += String.format("- %s | %ss x %sr (date: %s)\n",
////                    w.getOrDefault("exerciseName", "unknown"),
////                    w.getOrDefault("sets", "?"),
////                    w.getOrDefault("reps", "?"),
////                    w.getOrDefault("date", "?"));
////        }
////
////        prompt += "\nRespond with short bullets and a one-line encouraging closer.";
////        return prompt;
////    }
////
////    /** NEW: extract text safely from response */
//////    private String extractText(Response response) {
//////        if (response.getOutput() == null || response.getOutput().isEmpty()) return "";
//////        // Join all content parts
//////        return response.getOutput().stream()
//////                .flatMap(r -> r.getContent().stream())
//////                .map(c -> c.getText())
//////                .collect(Collectors.joining("\n")).trim();
//////    }
////    private String extractText(Response response) {
////        if (response == null) return "";
////        return response.outputText(); // already returns the combined text
////    }
////}
////
//
//package com.example.fitgenius.service;
//
//import com.openai.client.OpenAIClient;
//import com.openai.models.responses.Response;
//import com.openai.models.responses.ResponseCreateParams;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class AiService {
//
//    private final OpenAIClient client;
//    private final String model;
//
//    public AiService(OpenAIClient client,
//                     @Value("${openai.model:gpt-4o-mini}") String model) {
//        this.client = client;
//        this.model = model;
//    }
//
//    /** 1) Generate workout plan */
//    public String generatePlan(String goal, String minutes, String equipment) {
//        String prompt = buildPlanPrompt(goal, minutes, equipment);
//
//        ResponseCreateParams params = ResponseCreateParams.builder()
//                .model(model)
//                .input(prompt)
//                .maxOutputTokens(800)
//                .temperature(0.7)
//                .build();
//
//        Response response = client.responses().create(params);
//        return "hi";
////        return response.outputText(); // Use outputText() instead of getOutput()
//    }
//
//    /** 2) Auto-coach analysis */
//    @SuppressWarnings("unchecked")
//    public String generateAutoInsights(Map<String, Object> payload) {
//        List<Map<String, Object>> workouts = (List<Map<String, Object>>) payload.get("workouts");
//
//        if (workouts == null || workouts.isEmpty()) {
//            return "No workouts found — keep logging your sessions and I'll analyze them!";
//        }
//
//        // sort by date (ISO format)
//        List<Map<String, Object>> sorted = workouts.stream()
//                .sorted((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")))
//                .toList();
//
//        int totalVolume = 0;
//        int recentVolume = 0;
//        int prevVolume = 0;
//
//        for (int i = 0; i < sorted.size(); i++) {
//            Map<String, Object> w = sorted.get(i);
//            int sets = toInt(w.get("sets"));
//            int reps = toInt(w.get("reps"));
//            int v = sets * reps;
//            totalVolume += v;
//            if (i == sorted.size() - 1) recentVolume = v;
//            if (i == sorted.size() - 2) prevVolume = v;
//        }
//
//        String prompt = buildAutoCoachPrompt(prevVolume, recentVolume, sorted);
//
//        ResponseCreateParams params = ResponseCreateParams.builder()
//                .model(model)
//                .input(prompt)
//                .maxOutputTokens(300)
//                .temperature(0.8)
//                .build();
//
//        Response response = client.responses().create(params);
//        return "hi";
////        return response.outputText(); // simplified
//    }
//
//    /** 3) Chat trainer */
//    public String chatTrainer(String userMessage) {
//        String prompt = "You are a friendly fitness coach and trainer. Reply in an encouraging, short tone. "
//                + "If the user asks for a workout plan, ask clarifying questions if needed.\n\nUser: "
//                + userMessage + "\n\nCoach:";
//
//        ResponseCreateParams params = ResponseCreateParams.builder()
//                .model(model)
//                .input(prompt)
//                .temperature(0.85)
//                .maxOutputTokens(400)
//                .build();
//
//        Response response = client.responses().create(params);
//        return "hi";
//
////        return response.outputText();
//    }
//
//    /** Helper methods */
//
//    private static int toInt(Object o) {
//        if (o == null) return 0;
//        if (o instanceof Number) return ((Number) o).intValue();
//        try { return Integer.parseInt(o.toString()); } catch (Exception e) { return 0; }
//    }
//
//    private String buildPlanPrompt(String goal, String minutes, String equipment) {
//        return "You are a friendly fitness coach. Create a 5-day workout plan for the user.\n"
//                + "Goal: " + (goal == null ? "General fitness" : goal) + "\n"
//                + "Daily time (minutes): " + (minutes == null ? "30" : minutes) + "\n"
//                + "Equipment: " + (equipment == null || equipment.isBlank() ? "bodyweight" : equipment) + "\n\n"
//                + "Constraints: beginner friendly, safe progressions, include full warm-up and cool-down. "
//                + "Provide day-by-day plan with exercise names, sets, and reps.\n"
//                + "Tone: friendly motivator. Keep plan concise (max 300 tokens).";
//    }
//
//    private String buildAutoCoachPrompt(int prevVolume, int recentVolume, List<Map<String, Object>> sorted) {
//        double percentChange = (prevVolume == 0) ? 0 : ((recentVolume - prevVolume) * 100.0 / prevVolume);
//
//        String summary = String.format(
//                "Total sessions: %d. Most recent session volume: %d. Previous session volume: %d. Volume change: %.1f%%.",
//                sorted.size(), recentVolume, prevVolume, percentChange
//        );
//
//        String prompt = "You are a friendly fitness coach. Based on the following user workout summary, "
//                + "provide a short, encouraging analysis (2-4 bullets) and one practical suggestion.\n\n"
//                + "Summary: " + summary + "\n\nRecent workouts (most recent last):\n";
//
//        int start = Math.max(0, sorted.size() - 6);
//        for (int i = start; i < sorted.size(); i++) {
//            Map<String, Object> w = sorted.get(i);
//            prompt += String.format("- %s | %ss x %sr (date: %s)\n",
//                    w.getOrDefault("exerciseName","unknown"),
//                    w.getOrDefault("sets","?"),
//                    w.getOrDefault("reps","?"),
//                    w.getOrDefault("date","?")
//            );
//        }
//
//        prompt += "\nRespond with short bullets and one-line encouraging closer.";
//        return prompt;
//    }
//}
//

//
//package com.example.fitgenius.service;
//
//import com.openai.OpenAI;
//import com.openai.models.ChatCompletion;
//import com.openai.models.ChatCompletionCreateParams;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class AiService {
//
//    private final OpenAI openai;
//    private final String model;
//
//    public AiService(@Value("${openai-api-key}") String apiKey,
//                     @Value("${openai.model:gpt-4o-mini}") String model) {
//        this.openai = new OpenAI(apiKey);
//        this.model = model;
//    }
//
//    // 🏋️ 1) Generate Workout Plan
//    public String generatePlan(String goal, String minutes, String equipment) {
//        String prompt = buildPlanPrompt(goal, minutes, equipment);
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(model)
//                .addMessage(ChatCompletionCreateParams.Message.builder()
//                        .role(ChatCompletionCreateParams.Message.Role.USER)
//                        .content(prompt)
//                        .build())
//                .build();
//
//        ChatCompletion response = openai.chatCompletions().create(params);
//        return extractText(response);
//    }
//
//    // 📊 2) Auto-Coach Insights
//    @SuppressWarnings("unchecked")
//    public String generateAutoInsights(Map<String, Object> payload) {
//        List<Map<String, Object>> workouts = (List<Map<String, Object>>) payload.get("workouts");
//
//        if (workouts == null || workouts.isEmpty()) {
//            return "No workouts found — keep logging your sessions and I'll analyze them!";
//        }
//
//        // Sort workouts by date (assuming ISO date format)
//        List<Map<String, Object>> sorted = workouts.stream()
//                .sorted((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")))
//                .toList();
//
//        int totalVolume = 0;
//        int recentVolume = 0;
//        int prevVolume = 0;
//
//        for (int i = 0; i < sorted.size(); i++) {
//            Map<String, Object> w = sorted.get(i);
//            int sets = toInt(w.get("sets"));
//            int reps = toInt(w.get("reps"));
//            int v = sets * reps;
//            totalVolume += v;
//            if (i == sorted.size() - 1) recentVolume = v;
//            if (i == sorted.size() - 2) prevVolume = v;
//        }
//
//        String prompt = buildAutoCoachPrompt(prevVolume, recentVolume, sorted);
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(model)
//                .addMessage(ChatCompletionCreateParams.Message.builder()
//                        .role(ChatCompletionCreateParams.Message.Role.USER)
//                        .content(prompt)
//                        .build())
//                .build();
//
//        ChatCompletion response = openai.chatCompletions().create(params);
//        return extractText(response);
//    }
//
//    // 💬 3) Chat Trainer
//    public String chatTrainer(String userMessage) {
//        String prompt = "You are a friendly fitness coach and trainer. "
//                + "Reply in an encouraging, short tone. If the user asks for a workout plan, ask clarifying questions.\n\n"
//                + "User: " + userMessage + "\n\nCoach:";
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(model)
//                .addMessage(ChatCompletionCreateParams.Message.builder()
//                        .role(ChatCompletionCreateParams.Message.Role.USER)
//                        .content(prompt)
//                        .build())
//                .build();
//
//        ChatCompletion response = openai.chatCompletions().create(params);
//        return extractText(response);
//    }
//
//    // 🧩 Helper Methods
//
//    private static int toInt(Object o) {
//        if (o == null) return 0;
//        if (o instanceof Number) return ((Number) o).intValue();
//        try { return Integer.parseInt(o.toString()); } catch (Exception e) { return 0; }
//    }
//
//    private String buildPlanPrompt(String goal, String minutes, String equipment) {
//        return "You are a friendly fitness coach. Create a 5-day workout plan for the user.\n"
//                + "Goal: " + (goal == null ? "General fitness" : goal) + "\n"
//                + "Daily time (minutes): " + (minutes == null ? "30" : minutes) + "\n"
//                + "Equipment: " + (equipment == null || equipment.isBlank() ? "bodyweight" : equipment) + "\n\n"
//                + "Constraints: beginner friendly, safe progressions, include warm-up and cool-down.\n"
//                + "Tone: friendly motivator. Keep concise.";
//    }
//
//    private String buildAutoCoachPrompt(int prevVolume, int recentVolume, List<Map<String, Object>> sorted) {
//        double percentChange = (prevVolume == 0) ? 0 : ((recentVolume - prevVolume) * 100.0 / prevVolume);
//
//        String summary = String.format(
//                "Total sessions: %d. Most recent volume: %d. Previous volume: %d. Change: %.1f%%.",
//                sorted.size(), recentVolume, prevVolume, percentChange
//        );
//
//        StringBuilder prompt = new StringBuilder();
//        prompt.append("You are a friendly fitness coach. Based on the following workout summary, ")
//                .append("give 3 short motivational insights and one practical improvement tip.\n\n")
//                .append("Summary: ").append(summary).append("\n\nRecent workouts:\n");
//
//        int start = Math.max(0, sorted.size() - 6);
//        for (int i = start; i < sorted.size(); i++) {
//            Map<String, Object> w = sorted.get(i);
//            prompt.append(String.format("- %s | %ss x %sr (date: %s)\n",
//                    w.getOrDefault("exerciseName", "unknown"),
//                    w.getOrDefault("sets", "?"),
//                    w.getOrDefault("reps", "?"),
//                    w.getOrDefault("date", "?")));
//        }
//
//        prompt.append("\nRespond briefly and encouragingly.");
//        return prompt.toString();
//    }
//
//    private String extractText(ChatCompletion response) {
//        try {
//            return response.choices().get(0).message().content().get(0).text();
//        } catch (Exception e) {
//            return "⚠️ Couldn't read response properly.";
//        }
//    }
//}
//
//
//package com.example.fitgenius.service;
//
//import com.openai.OpenAI;
//import com.openai.models.ChatCompletion;
//import com.openai.models.ChatCompletionCreateParams;
//import com.openai.models.ChatModel;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class AiService {
//
//    private final OpenAI openai;
//    private final String model = ChatModel.GPT_4O_MINI; // default model
//
//    // 🏋️ Generate Workout Plan
//    public String generatePlan(String goal, String minutes, String equipment) {
//        String prompt = buildPlanPrompt(goal, minutes, equipment);
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(model)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return extractText(response);
//    }
//
//    // 📊 Auto-Coach Insights
//    @SuppressWarnings("unchecked")
//    public String generateAutoInsights(Map<String, Object> payload) {
//        List<Map<String, Object>> workouts = (List<Map<String, Object>>) payload.get("workouts");
//
//        if (workouts == null || workouts.isEmpty()) {
//            return "No workouts found — keep logging your sessions and I'll analyze them!";
//        }
//
//        // Sort workouts by date
//        List<Map<String, Object>> sorted = workouts.stream()
//                .sorted((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")))
//                .toList();
//
//        int recentVolume = 0;
//        int prevVolume = 0;
//
//        for (int i = 0; i < sorted.size(); i++) {
//            Map<String, Object> w = sorted.get(i);
//            int sets = toInt(w.get("sets"));
//            int reps = toInt(w.get("reps"));
//            int v = sets * reps;
//            if (i == sorted.size() - 1) recentVolume = v;
//            if (i == sorted.size() - 2) prevVolume = v;
//        }
//
//        String prompt = buildAutoCoachPrompt(prevVolume, recentVolume, sorted);
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(model)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return extractText(response);
//    }
//
//    // 💬 Chat Trainer
//    public String chatTrainer(String userMessage) {
//        String prompt = "You are a friendly fitness coach and trainer. "
//                + "Reply in an encouraging, short tone. If the user asks for a workout plan, ask clarifying questions.\n\n"
//                + "User: " + userMessage + "\n\nCoach:";
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(model)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return extractText(response);
//    }
//
//    // 🔧 Helpers
//    private static int toInt(Object o) {
//        if (o == null) return 0;
//        if (o instanceof Number) return ((Number) o).intValue();
//        try { return Integer.parseInt(o.toString()); } catch (Exception e) { return 0; }
//    }
//
//    private String buildPlanPrompt(String goal, String minutes, String equipment) {
//        return "You are a friendly fitness coach. Create a 5-day workout plan.\n"
//                + "Goal: " + (goal == null ? "General fitness" : goal) + "\n"
//                + "Daily time (minutes): " + (minutes == null ? "30" : minutes) + "\n"
//                + "Equipment: " + (equipment == null || equipment.isBlank() ? "bodyweight" : equipment) + "\n\n"
//                + "Constraints: beginner friendly, safe progressions, include warm-up and cool-down.\n"
//                + "Tone: friendly motivator. Keep concise.";
//    }
//
//    private String buildAutoCoachPrompt(int prevVolume, int recentVolume, List<Map<String, Object>> sorted) {
//        double percentChange = (prevVolume == 0) ? 0 : ((recentVolume - prevVolume) * 100.0 / prevVolume);
//
//        StringBuilder prompt = new StringBuilder();
//        prompt.append("You are a friendly fitness coach. Based on the following workout summary, ")
//                .append("give 3 short motivational insights and one practical improvement tip.\n\n")
//                .append(String.format("Total sessions: %d. Most recent volume: %d. Previous volume: %d. Change: %.1f%%.\n\n",
//                        sorted.size(), recentVolume, prevVolume, percentChange))
//                .append("Recent workouts:\n");
//
//        int start = Math.max(0, sorted.size() - 6);
//        for (int i = start; i < sorted.size(); i++) {
//            Map<String, Object> w = sorted.get(i);
//            prompt.append(String.format("- %s | %ss x %sr (date: %s)\n",
//                    w.getOrDefault("exerciseName", "unknown"),
//                    w.getOrDefault("sets", "?"),
//                    w.getOrDefault("reps", "?"),
//                    w.getOrDefault("date", "?")));
//        }
//
//        prompt.append("\nRespond briefly and encouragingly.");
//        return prompt.toString();
//    }
//
//    private String extractText(ChatCompletion response) {
//        try {
//            return response.choices().getFirst().message().content().orElse("⚠️ Couldn't read response properly.");
//        } catch (Exception e) {
//            return "⚠️ Couldn't read response properly.";
//        }
//    }
//}
//
//
//package com.example.fitgenius.service;
//
//import com.openai.client.OpenAIClient;
//import com.openai.client.okhttp.OpenAIOkHttpClient;
//import com.openai.models.ChatModel;
//import com.openai.models.chat.completions.ChatCompletion;
//import com.openai.models.chat.completions.ChatCompletionCreateParams;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class AiService {
//
//    private final OpenAIClient openai;
//
//    public AiService() {
//        // Initialize client from environment variables or application.properties
//        this.openai = OpenAIOkHttpClient.builder()
//                .apiKey(System.getenv("OPENAI_API_KEY")) // or inject via @Value
//                .build();
//    }
//
//    // 🏋️ Generate Workout Plan
//    public String generatePlan(String goal, String minutes, String equipment) {
//        String prompt = buildPlanPrompt(goal, minutes, equipment);
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_4_1)   // or GPT_4O_MINI depending on your plan
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
//    }
//
//
//
//
//    // 📊 Auto-Coach Insights
//    public String generateAutoInsights(Map<String, Object> payload) {
//        // same logic as before, just use ChatCompletionCreateParams
//        String prompt = "Analyze workouts: " + payload.toString();
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_4_1)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
//    }


    // 💬 Chat Trainer
//    public String chatTrainer(String userMessage) {
//        String prompt = "You are a friendly fitness coach. User: " + userMessage;
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_4_1)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
////    }
//
//
//}
//
//  package com.example.fitgenius.service;
//
//import com.openai.client.OpenAIClient;
//import com.openai.models.ChatModel;
//import com.openai.models.chat.completions.ChatCompletion;
//import com.openai.models.chat.completions.ChatCompletionCreateParams;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class AiService {
//
//    // Injected from OpenAIConfig
//    private final OpenAIClient openai;
//
//    // 🏋️ Generate Workout Plan
//    public String generatePlan(String goal, String minutes, String equipment) {
//        String prompt = buildPlanPrompt(goal, minutes, equipment);
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_3_5_TURBO)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
//    }
//
//    // 📊 Auto-Coach Insights
//    public String generateAutoInsights(Map<String, Object> payload) {
//        String prompt = "Analyze workouts: " + payload.toString();
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_4_1)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
//    }
//
//    // 💬 Chat Trainer
//    public String chatTrainer(String userMessage) {
//        String prompt = "You are a friendly fitness coach. Reply in an encouraging, short tone.\n"
//                + "User: " + userMessage + "\nCoach:";
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_4_1)
//                .addUserMessage(prompt)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
//    }
//
//    // 🔧 Helper
//    private String buildPlanPrompt(String goal, String minutes, String equipment) {
//        return "Create a 5-day workout plan.\n"
//                + "Goal: " + (goal == null ? "General fitness" : goal) + "\n"
//                + "Daily time: " + (minutes == null ? "30" : minutes) + " minutes\n"
//                + "Equipment: " + (equipment == null ? "bodyweight" : equipment);
//                    }
//}

//
//package com.example.fitgenius.service;
//
//import com.openai.client.OpenAIClient;
//import com.openai.models.ChatModel;
//import com.openai.models.chat.completions.ChatCompletion;
//import com.openai.models.chat.completions.ChatCompletionCreateParams;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class AiService {
//
//    private final OpenAIClient openai;
//
//
//    public String chat(String userMessage) {
//        String systemPrompt = """
//            You are a friendly fitness coach chatbot.
//            - If the user asks for a workout plan, generate a structured plan.
//            - If the user asks for motivation, give an encouraging response.
//            - If the user asks a general fitness question, answer clearly.
//            - Always reply in a concise, coach-like tone.
//            """;
//
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model(ChatModel.GPT_3_5_TURBO) // safer for testing; switch to GPT_4_1 if you have access
//                .addSystemMessage(systemPrompt)
//                .addUserMessage(userMessage)
//                .build();
//
//        ChatCompletion response = openai.chat().completions().create(params);
//        return response.choices().getFirst().message().content().orElse("empty");
//    }
//}
//package com.example.fitgenius.service;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//@Service
//@RequiredArgsConstructor
//public class AiService {
//
//    private final WebClient geminiWebClient;
//
//    @Value("${gemini-model:gemini-pro}")
//    private String geminiModel;
//
//    public String chat(String userMessage) {
//        String systemPrompt = """
//            You are a friendly fitness coach chatbot.
//            - If the user asks for a workout plan, generate a structured plan.
//            - If the user asks for motivation, give an encouraging response.
//            - If the user asks a general fitness question, answer clearly.
//            - Always reply in a concise, coach-like tone.
//            """;
//
//        // Gemini expects "contents" with "parts"
//        String requestBody = """
//            {
//              "contents": [
//                {
//                  "role": "user",
//                  "parts": [
//                    {"text": "%s"}
//                  ]
//                }
//              ]
//            }
//            """.formatted(systemPrompt + "\nUser: " + userMessage);
//
//        return geminiWebClient.post()
//                .uri("/models/" + geminiModel + ":generateContent")
//                .bodyValue(requestBody)
//                .retrieve()
//                .bodyToMono(String.class)
//                .onErrorResume(e -> Mono.just("Error: " + e.getMessage()))
//                .block();
//    }
//}


package com.example.fitgenius.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    private final WebClient geminiWebClient;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model:gemini-pro}")
    private String geminiModel;

    public String chat(String userMessage) {
        String systemPrompt = """
            You are a friendly fitness coach chatbot.
            - If the user asks for a workout plan, generate a structured plan.
            - If the user asks for motivation, give an encouraging response.
            - If the user asks a general fitness question, answer clearly.
            - Always reply in a concise, coach-like tone.
            """;

        String fullPrompt = systemPrompt + "\nUser: " + userMessage;

        // Correct Gemini API request format
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", fullPrompt)
                                }
                        )
                }
        );

        try {
            return geminiWebClient.post()
                    .uri("/models/" + geminiModel + ":generateContent?key=" + geminiApiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .onErrorResume(e -> {
                        System.err.println("Error calling Gemini API: " + e.getMessage());
                        return Mono.just("{\"error\": \"Unable to get response from AI service\"}");
                    })
                    .block();
        } catch (Exception e) {
            return "{\"error\": \"Service temporarily unavailable\"}";
        }
    }
}