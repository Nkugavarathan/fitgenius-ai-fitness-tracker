# 🏋️‍♂️ FitGenius – AI Fitness Tracker

**FitGenius** is a full-stack fitness tracking system built with **Spring Boot** + **React**. Users can log workouts, track goals, monitor progress, and chat with a virtual AI coach powered by **Google Gemini**. Includes **JWT** authentication and a modern dashboard with analytics charts using **Recharts**.

---
## 🎥Live Demo Video
[Watch Demo on YouTube](https://youtu.be/E2mUAchtv0Y)

- 🖼️ **Screenshots:**
  [Home Page](./screenshots/home.JPG)
  [Login Page](./screenshots/login.JPG)
  [Register Page](./screenshots/register.JPG)
   [Weight Page](./screenshots/weight.JPG)
   [Workout Page](./screenshots/workout.JPG)
   [Goal Page](./screenshots/goal.JPG)
     [Calorie Page](./screenshots/calorie.JPG)
        [Dashboard1 Page](./screenshots/dashboard1.JPG)
           [Dashboard2 Page](./screenshots/dashboard2.JPG)
              [Chat Demo Page](./screenshots/chatdemo.JPG)
---

## ✨ Key Features

✔ **JWT Authentication** (Signup + Login)  
✔ **AI Fitness Coach** using Google Gemini  
✔ **Workout Logging** (sets, reps, exercises)  
✔ **Daily Weight Tracking**  
✔ **Calories Tracking**  
✔ **Goal Management** (muscle gain, weight loss, steps, etc.)  
✔ **Interactive Dashboard** using Recharts  
✔ **Modern UI** with React + Tailwind CSS  
✔ **Fully Responsive** (Mobile-First)  
✔ **Spring Boot Backend** with layered architecture  
✔ **MySQL Database Integration**  
✔ **Clean REST API** for all fitness features  

---

## 🧱 Tech Stack

### **Frontend**
- React.js  
- Tailwind CSS  
- Axios  
- Recharts  
- Context API / Hooks  

### **Backend**
- Java  
- Spring Boot  
- Spring Security (JWT Authentication)  
- Spring Data JPA  
- MySQL  

### **AI**
- **Google Gemini API**  
  - Personalized workout plans  
  - Motivation messages  
  - Diet & exercise recommendations  

---

## 📌 API Endpoints
### Auth
```http
POST /api/auth/register
POST /api/auth/login
```
### Workouts
```http
POST /api/workouts
GET  /api/workouts
DELETE /api/workouts/{id}
```
### Weight
```http
POST /api/weight
GET  /api/weight
```
### Calories
```http
POST /api/calories
GET  /api/calories
```
### Goals
```http
POST /api/goals
GET  /api/goals
PUT /api/goals/{id}/progress
```
### AI Chat
```http
POST /api/ai/chat
```

