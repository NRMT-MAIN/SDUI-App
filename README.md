# Kiddo: Enterprise Server-Driven UI (SDUI) Engine

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-Bear-brown?style=for-the-badge)

A highly performant, configuration-driven React Native application built to demonstrate advanced **Server-Driven UI (SDUI)** architecture. 

---

## 🎯 The Challenge & Mission

In traditional mobile development, launching a "Diwali Flash Sale" or a "Summer Playhouse" campaign requires hardcoding UI changes, building a new binary, and waiting days for app store approvals. 

**The Mission:** Build an architecture that bypasses the app stores entirely. The backend must be able to dictate the layout, inject visual themes Over-The-Air (OTA), and completely swap out interactive elements in real-time, while maintaining buttery-smooth 60FPS performance on the client device.

---

## 🛠️ Tech Stack & Tooling

* **Framework:** React Native (Expo)
* **Language:** TypeScript configured in Strict Mode
* **List Rendering:** `@shopify/flash-list` & optimized native `FlatList`
* **State Management:** `zustand` (Local collocated state), React Context API (Global theming)
* **Animations:** `lottie-react-native`

---

## 🚦 Getting Started

Follow these instructions to spin up the SDUI engine on your local machine.

### Prerequisites
* Node.js (v18+)
* Expo CLI (`npm install -g expo-cli`)
* iOS Simulator (Mac only) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/kiddo-sdui.git](https://github.com/your-username/kiddo-sdui.git)
   cd kiddo-sdui
   ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start the App**
    ```bash
    npm run android
    ```