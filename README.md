# MathLearn AI 🧠📚

MathLearn AI is an AI-powered educational platform built around **Socratic learning principles**. Instead of simply giving students answers, the platform encourages them to think critically, reason through problems, and develop a deeper understanding of mathematical concepts.

The goal is to transform learning from passive answer consumption into an active problem-solving experience.

---

## ✨ Features

- 🤖 AI-powered tutoring assistant
- 🧩 Socratic questioning approach
- 📈 Step-by-step reasoning guidance
- 🎯 Encourages critical thinking and problem-solving
- 📚 Supports conceptual understanding rather than memorization
- 🔐 Firebase authentication and cloud services
- ⚡ Fast and modern web interface

---

## 🛠️ Tech Stack

- **Frontend:** Next.js
- **Language:** TypeScript / JavaScript
- **AI Model:** Google Gemini
- **Backend Services:** Firebase
- **Styling:** Tailwind CSS (if applicable)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mathlearn-ai.git
cd mathlearn-ai
```

---

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

Or using yarn:

```bash
yarn install
```

---

### 3. Create Environment Variables

Create a file named:

```bash
.env.local
```

in the project root directory.

Add the following variables:

```env
# Google Gemini API Key
# Get it from https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_key_here

# Firebase Configuration
# Get these from Firebase Console > Project Settings > General > Your Apps
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 🔑 Obtaining API Keys

### Google Gemini API

1. Visit:
   https://aistudio.google.com/app/apikey

2. Sign in with your Google account.

3. Create a new API key.

4. Copy the key and paste it into:

```env
GEMINI_API_KEY=
```

---

### Firebase Configuration

1. Open Firebase Console:
   https://console.firebase.google.com

2. Create a new project (or select an existing one).

3. Navigate to:

```text
Project Settings → General → Your Apps
```

4. Register a Web App.

5. Copy the Firebase configuration values into your `.env.local` file.

---

## ▶️ Running Locally

Start the development server:

```bash
npm run dev
```

or

```bash
pnpm dev
```

or

```bash
yarn dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

---

## 📂 Project Structure

```text
mathlearn-ai/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── services/
│   └── utils/
│
├── .env.local
├── package.json
└── README.md
```

---

## 🎓 Educational Philosophy

MathLearn AI follows the **Socratic Method**, a teaching approach that promotes learning through guided questioning.

Instead of:

❌ Giving direct answers immediately

The platform:

✅ Asks guiding questions  
✅ Encourages reflection  
✅ Breaks complex problems into manageable steps  
✅ Helps students discover solutions independently

This approach develops:

- Critical thinking
- Mathematical intuition
- Long-term retention
- Problem-solving confidence

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 🌟 Vision

MathLearn AI aims to make learning mathematics more engaging, interactive, and intellectually rewarding by helping students learn **how to think**, not just **what to answer**.
