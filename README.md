# PulseCoach AI

**PulseCoach AI** is a personalized sports coaching app powered by AI. It provides real-time pose correction, adaptive workout plans, and voice-guided training that adjusts based on your sport, muscle focus, mood, and wearable data.

---

## Features

- **Real-Time Pose Correction:** Uses phone camera with MediaPipe/TensorFlow.js to analyze form and give instant feedback.
- **Adaptive Workouts:** AI-generated personalized training plans based on athlete data, fatigue, mood, and muscle focus.
- **Wearable Integration:** Syncs with HealthKit (iOS) and Google Fit (Android) to track heart rate, sleep, and activity.
- **Voice Diary:** Athletes can log updates verbally, transcribed and analyzed for smarter workouts.
- **Performance Dashboard:** Visual stats, goal tracking, and progress monitoring.
- **Firebase Integration:** Handles authentication, data storage, and workout reminders.

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **AI & ML:** ElevenLabs Agents, TensorFlow.js, MediaPipe  
- **Backend & Storage:** Firebase (Auth & Firestore)  
- **Wearables:** HealthKit, Google Fit APIs  
- **Other:** React Hook Form, Zod (validation)

---

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/kaven17/PulseCoach.git
   cd PulseCoach
