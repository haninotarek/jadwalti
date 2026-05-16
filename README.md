<div align="center">

# 🟢 Jadwalti — جدولتي

### Study Smarter, Not Harder.

**Smart Study Planner + Pomodoro Timer + Focus Mode**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-jadwalti.vercel.app-c8f04d?style=for-the-badge&labelColor=0a0a0f)](https://jadwalti.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white&labelColor=0a0a0f)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white&labelColor=0a0a0f)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-ffffff?style=for-the-badge&logo=vercel&logoColor=black&labelColor=0a0a0f)](https://vercel.com)

<br/>

> *"Stop wasting time organizing your schedule — let Jadwalti do it for you."*

</div>

---

## ✨ About

**Jadwalti** (Arabic for *"My Schedule"*) is a smart web app that helps students organize their study sessions before exams.

You enter your subjects and exam dates — Jadwalti automatically builds an optimized study plan, then helps you execute it with a Pomodoro timer and a distraction-free Focus Mode.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📅 **Smart Study Plan** | Automatically distributes your study hours based on how close each exam is |
| ⏱ **Pomodoro Timer** | 25 min focus + 5 min break — the scientifically proven method |
| 🌑 **Focus Mode** | Blacks out the screen, hides everything except your timer |
| 📊 **Daily Report** | See exactly how many hours you studied per subject |
| 💾 **Auto Save** | All data saved in your browser — nothing lost on refresh |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |

---

## 🎯 How It Works

```
1. Add your subjects + exam dates
          ↓
2. Hit "Build My Plan" — the algorithm calculates distribution
          ↓
3. Start the Pomodoro timer for your first subject
          ↓
4. Activate Focus Mode for zero distractions
          ↓
5. Check your daily report to track progress
```

---

## 🛠️ Tech Stack

```
Frontend    →  React 18 + Vite
Routing     →  React Router DOM
State       →  React Context API
Storage     →  localStorage (no backend needed)
Styling     →  CSS Variables + Custom CSS
Fonts       →  Tajawal + Space Mono
Deploy      →  Vercel
```

---

## 🗂️ Project Structure

```
jadwalti/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx           ← Hero landing page
│   │   ├── Dashboard.jsx         ← Add subjects & exam dates
│   │   ├── Study.jsx             ← Timer + schedule view
│   │   └── Report.jsx            ← Daily stats & progress
│   │
│   ├── components/
│   │   ├── PomodoroTimer.jsx     ← Full Pomodoro timer
│   │   ├── FocusMode.jsx         ← Fullscreen focus overlay
│   │   ├── ScheduleList.jsx      ← Subject list from plan
│   │   ├── SubjectCard.jsx       ← Individual subject card
│   │   ├── ProgressBar.jsx       ← Progress visualization
│   │   └── Notification.jsx      ← Toast notifications
│   │
│   ├── context/
│   │   └── AppContext.jsx        ← Global state management
│   │
│   └── utils/
│       ├── scheduleGenerator.js  ← Smart scheduling algorithm
│       └── storage.js            ← localStorage helpers
```

---

## ⚙️ Run Locally

```bash
# Clone the repo
git clone https://github.com/haninotarek/jadwalti.git

# Navigate to the project
cd jadwalti

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open in browser
http://localhost:5173
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0f` | Page background |
| Surface | `#111118` | Secondary background |
| Card | `#16161f` | Card backgrounds |
| Accent | `#c8f04d` | Primary actions, timer |
| Purple | `#7c6af7` | Secondary effects |
| Pink | `#f04d8c` | Special highlights |

---

## 🧠 The Algorithm

Jadwalti uses a **weighted distribution algorithm** to allocate study hours:

```
weight(subject) = 1 / daysUntilExam

hoursPerDay(subject) = (weight / totalWeight) × dailyStudyHours
```

The closer the exam → the higher the weight → the more hours allocated. Simple, smart, effective.

---

## 📱 Try It Now

> 🔗 **[jadwalti.vercel.app](https://jadwalti.vercel.app)**

---

<div align="center">

Built with 💛 by **[haninotarek](https://github.com/haninotarek)**

*Jadwalti — not just a schedule, it's your study companion.*

</div>
