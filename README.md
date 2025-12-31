# 🛡️ Real-Time AI Fraud Detection Dashboard

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![AI Powered](https://img.shields.io/badge/AI-Powered-FFD700)
![Status](https://img.shields.io/badge/Status-Completed-success)

A full-stack **MERN** application designed to monitor high-volume e-commerce transactions in real-time. It utilizes **WebSockets** for live data streaming and **Google Gemini AI** to analyze transaction patterns, instantly flagging fraudulent activity with detailed reasoning.

---

## 🚀 Live Demo & Links

- **🌐 Live Deployment:** [Click here to view App](https://fraud-monitor-dashboard.onrender.com) *(Replace with your Render URL)*
- **🎥 Demo Video:** [Watch the Walkthrough](https://youtu.be/your-video-link) *(Replace with your Video URL)*
- **📂 Backend API:** [View API Health](https://fraud-monitor-api.onrender.com/health) *(Replace with your Backend URL)*

---

## ✨ Key Features

* **⚡ Real-Time Monitoring:** Live transaction feed updates instantly via **Socket.io** without page refreshes.
* **🤖 Generative AI Analysis:** Integrated **Google Gemini 1.5 Flash** to evaluate transaction context (IP, location, amount) and generate a natural language risk assessment.
* **📊 Interactive Dashboard:** Visualizes risk trends and volume using **Chart.js** and dynamic KPI cards.
* **🧪 Admin Simulation Mode:** Built-in "Traffic Generator" to simulate live transaction flow for testing and demonstration.
* **🔐 Role-Based Security:** Secure **JWT Authentication** with distinct roles:
    * **Admin:** Can start/stop simulations and manage users.
    * **Analyst:** Can view detailed investigations and flag transactions.
    * **Viewer:** Read-only access to the dashboard.
* **🐳 Dockerized:** Complete containerization of Frontend, Backend, and Database for consistent deployment.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Redux Toolkit, Tailwind CSS, Chart.js |
| **Backend** | Node.js, Express.js, JWT, Socket.io |
| **Database** | MongoDB (Mongoose) |
| **AI Engine** | Google Gemini Generative AI API |
| **DevOps** | Docker, Docker Compose, Render |

---

## 📸 Screenshots

| **Live Dashboard** | **AI Investigation** |
| :---: | :---: |
| ![Dashboard](https://placehold.co/600x400?text=Dashboard+Screenshot) | ![Investigation](https://placehold.co/600x400?text=AI+Analysis+Screenshot) |
| *Real-time visualization of transactions* | *Gemini AI explaining why a transaction is risky* |

---

## 🚀 Local Installation (Docker Method - Recommended)

The easiest way to run the application is using Docker Compose.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/AayushNandan623/Reaidy.io_assignment.git](https://github.com/AayushNandan623/Reaidy.io_assignment.git)
    cd Reaidy.io_assignment
    ```

2.  **Create Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

3.  **Run with Docker**
    ```bash
    docker compose up --build
    ```

4.  **Access the App**
    * Frontend: `http://localhost:5173`
    * Backend: `http://localhost:5000`

---

## 💻 Local Installation (Manual Method)

If you don't have Docker, you can run it manually.

### 1. Backend Setup
```bash
cd backend
npm install
# Create backend/.env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_atlas_url
# JWT_SECRET=any_secret_key
# GEMINI_API_KEY=your_gemini_key
# ADMIN_SECRET_CODE=admin123

npm start