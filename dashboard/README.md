# Words PDF - Japanese Word Learning App 📚

A modern web application for learning Japanese words with interactive memorization features, built with Next.js, TypeScript, and Prisma.

## ✨ Features

- **User Authentication** - Secure login and registration system
- **Lesson Management** - Create and manage Japanese word lessons
- **Interactive Memorization** - Carousel-based word learning with keyboard shortcuts
- **Word Details** - View complete word information (Kanji, Hiragana, English, Russian, Uzbek)
- **PDF Generation** - Export lessons as PDF documents
- **Progress Tracking** - Track your learning progress
- **Responsive Design** - Works on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: Custom auth system
- **UI Components**: Shadcn/ui
- **PDF Generation**: Custom PDF creation
- **State Management**: React Context API

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ravshanbekovvb/words-pdf-2.git
   cd words-pdf-2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DATABASE_URL="your-postgresql-database-url"
   JWT_SECRET="your-jwt-secret-key"
   NEXT_PUBLIC_GROQ_API_KEY="your-groq-api-key"
   ```

   **Environment Variables Explanation:**

   - `DATABASE_URL` - PostgreSQL database connection string
   - `JWT_SECRET` - Secret key for JWT token authentication
   - `NEXT_PUBLIC_GROQ_API_KEY` - API key for Groq AI service

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Creating Lessons

1. Navigate to "Create Lesson" page
2. Add Japanese words with their translations
3. Save your lesson

### Memorizing Words

1. Go to "Memorize" page
2. Select a lesson to practice
3. Use keyboard shortcuts:
   - **Space** - Mark as "not memorized" (next word)
   - **Enter** - Mark as "memorized" (remove from practice)
   - **Ctrl** - View word details (translations)

### Managing Content

- **My Docs** - View and manage your lessons
- **All Docs** - Browse all available lessons
- **Settings** - Customize your preferences

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── shared/         # Feature-specific components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── store/              # State management
└── types/              # TypeScript type definitions
```

## 🎯 Key Components

- **Memorize System** - Interactive word learning with carousel
- **PDF Generation** - Export lessons as formatted PDFs
- **Word Management** - CRUD operations for words and lessons
- **User Dashboard** - Comprehensive user interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ravshanbekov** - [GitHub](https://github.com/Ravshanbekovvb)

---

⭐ If you find this project helpful, please give it a star!
