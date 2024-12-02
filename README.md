# TimeHero

## About The Project

**Concept**
Earn Screen Time by Completing Productive Tasks- Productivity App

**Elevator Pitch**
Imagine an app that helps you take control of your screen time while motivating you to achieve more. You set a limit, and we keep you on track. Want more screen time? Complete beneficial tasks across different categories like fitness, learning, or mindfulness, and earn extra time. Stay focused with built-in tools like timers and notifications. If you leave the app while a task is running, we detect it to keep you honest. Join groups, compare your earned time on a leaderboard, and turn self-improvement into a friendly competition.

**Target Audience**
FOR (Parents and People Struggling with High Screen Time)
WHO (Want to manage screen time and boost productivity) 
TimeHero is a (productivity mobile app)
THAT (Allows users to earn screen time by completing productive tasks)
UNLIKE (Existing screen time limiting apps)
OUR PRODUCT (Rewards users for healthy and productive behaviors by allowing them to earn more screen time through positive actions)


**Implementation:**
Frontend: React Native for cross-platform mobile app development.
Backend: Node.js with Express, SQLite for data persistence.
State Management: Redux to manage tasks, user data, and time tracking.
APIs: RESTful APIs for user info, task progress, and leaderboard updates.

**Key Features**
Gamified Productivity System
    - Earn screen time by completing tasks in categories like fitness, learning, or mindfulness. Tasks are rewarded based on completion, encouraging balance and productivity.
Dynamic Leaderboard 
    - Friendly competition with friends by comparing earned screen time. 
Task Categories with Customization
    - Predefined tasks like "30 minutes outside" or "45 minutes of schoolwork." Option to add or customize tasks to suit individual needs.
Screen Time Management Tools
    - Track earned and redeemed screen time. Redeem using a timer-based interface.
Accountability Features 
    - App detects when users leave tasks mid-way and prevents progress updates.
Intuitive User Interface 
    - Simple, engaging screens like Home, Leaderboard, and Time Screen Pages. Interactive buttons, progress bars, and animations enhance usability.

**Core Features:**
Robust
    - Database with tables for users, tasks, and leaderboards. API endpoints for fetching user data, tasks, and leaderboard rankings.
State Management with Redux 
    - Efficient handling of user data, completed tasks, and screen time accumulation. Real-time updates for key components like the leaderboard and time tracker.
Customizable Task Framework.
    - Core logic for defining tasks with properties like time, metric, and steps. Flexibility to add new task types without breaking existing functionality.
Authentication and User Profiles 
    - Secure user login and profile management. Track completed tasks, accumulated screen time, and leaderboard participation.
Gamification Logic 
    - Algorithms for rewarding screen time based on task completion. Leaderboard logic to rank users by accumulated time.


**Video Demonstration**



## Project Setup
1. Clone Repository
   ```bash
   git clone [your-repository-url]
   ```

2. Change Directory
   ```bash
   cd .\TimeHero\TimeHero\
   ```
   
  **Frontend setup**
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

3. Open Web
   Press 'w' in the terminal

4. Option: Expo Go
   1. Prerequisites:
      1. Download Expo Go on mobile phone
   2. Ensure all dependencies are up-to-date
   3. Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


  **Backend setup**
1. Add a new terminal
   ```bash
   cd .\TimeHero\TimeHero\time-hero-backend\  
   ```
   
2. Install dependencies
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run Application
   ```bash
   npm start
   ```





   






   
