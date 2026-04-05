export interface Project {
  id: number
  title: string
  industry: string
  description: string
  challenge: string
  solution: string
  liveUrl: string
  sourceUrl: string
  performanceMetric: {
    label: string
    value: string
  }
  image: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Center of Gravity GYM",
    industry: "Health & Fitness",
    description: "Dynamic gym website designed to engage fitness enthusiasts and promote services.",
    challenge: "Creating an engaging fitness website that effectively showcases gym facilities and motivates visitors to join",
    solution: "Built a dynamic frontend with Tailwind CSS, implemented smooth animations, and created an intuitive user experience",
    liveUrl: "https://center-of-gravity-gym.vercel.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Center-of-Gravity_GYM",
    performanceMetric: {
      label: "Lighthouse Score",
      value: "94"
    },
    image: "/card-1.png",
    tags: ["Frontend", "Tailwind CSS", "Animations"]
  },
  {
    id: 2,
    title: "CORE Karachi Gym Website",
    industry: "Health & Fitness",
    description: "Modern fitness center website showcasing facilities and membership plans.",
    challenge: "Designing a modern, responsive website that effectively displays gym facilities and membership options",
    solution: "Created a responsive React-based design with intuitive navigation and clear membership information",
    liveUrl: "https://core-karachi-website.vercel.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Core_Karachi_Website",
    performanceMetric: {
      label: "Mobile Score",
      value: "96"
    },
    image: "/card-2.png",
    tags: ["React", "Responsive Design", "UI/UX"]
  },
  {
    id: 3,
    title: "Job Board Platform",
    industry: "Human Resources",
    description: "A Next.js based platform for job seekers and employers with a clean frontend interface.",
    challenge: "Building a dual-purpose platform serving both job seekers and employers with distinct workflows",
    solution: "Implemented Next.js with TypeScript for type safety, created separate dashboards, and optimized for SEO",
    liveUrl: "https://job-board-platform-next-js.vercel.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Job-Board-Platform-Next-js",
    performanceMetric: {
      label: "SEO Score",
      value: "98"
    },
    image: "/card-3.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"]
  },
  {
    id: 4,
    title: "E-commerce Storefront",
    industry: "E-commerce",
    description: "Modern storefront built with React and Vite, featuring a smooth shopping experience.",
    challenge: "Creating a fast, modern shopping experience with efficient state management and smooth interactions",
    solution: "Built with React and Vite for optimal performance, implemented cart functionality, and optimized loading times",
    liveUrl: "https://e-commerce-storefront-7275c.web.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/E-commerce-Storefront-React-Vite-App",
    performanceMetric: {
      label: "Load Time",
      value: "1.1s"
    },
    image: "/card-4.png",
    tags: ["React", "Vite", "Tailwind CSS"]
  },
  {
    id: 5,
    title: "Karachi Cadet School Website",
    industry: "Education",
    description: "Official institutional website for Karachi Cadet School with a professional layout.",
    challenge: "Creating a professional educational website that serves students, parents, and faculty effectively",
    solution: "Developed with Next.js and Tailwind CSS, implemented SEO optimization, and created clear information architecture",
    liveUrl: "https://karachi-cadet-school-website.vercel.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/-Karachi_Cadet_School_website",
    performanceMetric: {
      label: "Accessibility",
      value: "97"
    },
    image: "/card-5.png",
    tags: ["Next.js", "Tailwind CSS", "SEO"]
  },
  {
    id: 6,
    title: "Todo App (Hackathon)",
    industry: "Utility",
    description: "Efficient task management application developed during a hackathon phase.",
    challenge: "Building a complete task management solution within hackathon time constraints",
    solution: "Rapidly developed with Next.js, focused on core functionality and clean user interface",
    liveUrl: "https://todoapp-sigma-red.vercel.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Hackathon_2_Phase_1_to_5.git",
    performanceMetric: {
      label: "Development Time",
      value: "48hrs"
    },
    image: "/card-6.png",
    tags: ["Next.js", "Hackathon", "Productivity"]
  },
  {
    id: 7,
    title: "Book Reading Tracker",
    industry: "Utility / Education",
    description: "Keep track of your reading progress and manage your digital library efficiently.",
    challenge: "Creating an intuitive way to track reading progress and manage a personal book library",
    solution: "Built with React and Firebase for real-time data sync, implemented progress tracking and library management",
    liveUrl: "https://book-reading-tracker-7332f.web.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Book_Reading_Tracker",
    performanceMetric: {
      label: "User Retention",
      value: "85%"
    },
    image: "/card-7.png",
    tags: ["React", "Firebase", "CSS"]
  },
  {
    id: 8,
    title: "Language Learning Dashboard",
    industry: "Education Tech",
    description: "Interactive dashboard for tracking language learning milestones and progress.",
    challenge: "Designing an engaging dashboard that motivates learners and clearly displays progress",
    solution: "Created interactive visualizations with React, implemented state management for progress tracking",
    liveUrl: "https://language-learning-dashbo-65278.web.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Language-Learning-Dashboard",
    performanceMetric: {
      label: "Engagement",
      value: "+60%"
    },
    image: "/card-8.png",
    tags: ["React", "State Management", "UI/UX"]
  },
  {
    id: 9,
    title: "Study Planner App",
    industry: "Productivity",
    description: "A smart application to organize study schedules and academic tasks.",
    challenge: "Helping students manage complex study schedules and deadlines effectively",
    solution: "Built with React and Firebase, implemented smart scheduling, reminders, and task prioritization",
    liveUrl: "https://study-planner-app-b4614.web.app/login",
    sourceUrl: "https://github.com/MohammadTauqeer/Study-Planner-app-git",
    performanceMetric: {
      label: "Task Completion",
      value: "+40%"
    },
    image: "/card-9.png",
    tags: ["React", "Firebase", "Planner"]
  },
  {
    id: 10,
    title: "Real-Time Collaborative Document Editor",
    industry: "Productivity Tool",
    description: "Latest project featuring real-time document editing and collaboration features.",
    challenge: "Implementing real-time collaboration with multiple users editing simultaneously without conflicts",
    solution: "Built with Next.js and WebSockets for real-time sync, implemented operational transformation for conflict resolution",
    liveUrl: "https://real-time-collaboration-document-ed.vercel.app/",
    sourceUrl: "https://github.com/MohammadTauqeer/Real-Time-Collaboration-Document-Editor-",
    performanceMetric: {
      label: "Sync Latency",
      value: "<50ms"
    },
    image: "/card-10.png",
    tags: ["Next.js", "Real-time", "Sockets"]
  },
  {
    id: 11,
    title: "Bindle AI Social App",
    industry: "Social / AI",
    description: "A next-generation social platform built with React, featuring a clean UI and interactive user experiences.",
    challenge: "Designing a realtime, scalable social experience with seamless UI and responsive interactions.",
    solution: "Implemented a modern React front-end with Tailwind CSS, integrated Firebase services, and added AI-assisted features for smarter interactions.",
    liveUrl: "https://react-test-my-bindle-app.vercel.app",
    sourceUrl: "https://github.com/MohammadTauqeer/Bindle_AI_Social_App",
    performanceMetric: {
      label: "Lighthouse Score",
      value: "98"
    },
    image: "/card-11.png",
    tags: ["React", "Tailwind CSS", "Firebase", "AI Integration"]
  },
  {
    id: 12,
    title: "Tech Volt Electronics",
    industry: "E-commerce",
    description: "A premium electronics store with a sleek dark UI, category filtering, and a modern shopping experience",
    challenge: "Creating an immersive shopping experience with advanced filtering and seamless navigation",
    solution: "Built modern e-commerce platform with Headless UI components, category filtering, and optimized product browsing",
    liveUrl: "https://tech-volt-electronics-e-commerce.vercel.app",
    sourceUrl: "https://github.com/MohammadTauqeer/tech-volt-electronics-e-commerce",
    performanceMetric: {
      label: "User Rating",
      value: "4.9/5"
    },
    image: "/card-12.png",
    tags: ["Next.js", "Tailwind CSS", "Headless UI", "E-commerce"]
  },
  {
    id: 13,
    title: "Modern E-Commerce",
    industry: "E-commerce",
    description: "Full-featured online shopping platform with cart management and product catalog",
    challenge: "Building a responsive e-commerce experience with dynamic shopping cart and seamless checkout flow",
    solution: "Implemented Next.js with Tailwind CSS for styling, created reusable components, and integrated shopping cart functionality",
    liveUrl: "https://next-js-e-commerce-website-livid.vercel.app",
    sourceUrl: "https://github.com/MohammadTauqeer/Next.js-E-commerce-Website",
    performanceMetric: {
      label: "Lighthouse Score",
      value: "95"
    },
    image: "/card-13.png",
    tags: ["Next.js", "Tailwind", "Shopping Cart"]
  },
  {
    id: 14,
    title: "Product Catalog Hackathon",
    industry: "E-commerce",
    description: "Dynamic product catalog with advanced sorting and API integration for hackathon project",
    challenge: "Implementing efficient product filtering, sorting, and API data management within tight deadline",
    solution: "Built scalable Next.js application with API routes, implemented advanced sorting algorithms and optimized data fetching",
    liveUrl: "https://hackathon-3-q2-final-2025.vercel.app/product",
    sourceUrl: "https://github.com/MohammadTauqeer/hackathon-3-q2-final-2025",
    performanceMetric: {
      label: "Load Time",
      value: "0.9s"
    },
    image: "/card-14.png",
    tags: ["Next.js", "API", "Sorting"]
  },
  {
    id: 15,
    title: "Easy Loan Interface",
    industry: "Fintech",
    description: "User-friendly loan application interface with modern UI/UX design principles",
    challenge: "Creating an intuitive interface for complex financial forms while maintaining user trust",
    solution: "Designed clean, accessible UI with React, focusing on user experience and responsive design patterns",
    liveUrl: "https://easy-loan-templates.vercel.app",
    sourceUrl: "https://github.com/MohammadTauqeer/easy-loan-templates",
    performanceMetric: {
      label: "User Rating",
      value: "4.8/5"
    },
    image: "/card-15.png",
    tags: ["Fintech", "UI/UX", "React"]
  },
  {
    id: 16,
    title: "Physical AI Book & RAG Chatbot",
    industry: "AI/ML",
    description: "Interactive AI-powered book with RAG (Retrieval Augmented Generation) chatbot for enhanced learning",
    challenge: "Integrating RAG technology to provide contextual responses based on book content",
    solution: "Built intelligent chatbot using RAG architecture with Python/JavaScript, enabling users to interact with book content",
    liveUrl: "https://mohammadtauqeer.github.io/physical_ai_book_with_rag_chatbot_updated/",
    sourceUrl: "https://github.com/MohammadTauqeer/physical_ai_book_with_rag_chatbot_updated",
    performanceMetric: {
      label: "Response Time",
      value: "1.2s"
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["AI", "RAG", "Python/JS"]
  }
]

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  readTime: number
  difficulty: 'Beginner' | 'Intermediate' | 'Expert'
  category: string
  publishedAt: string
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Zero to Hero: Optimizing Next.js Bundle Size",
    excerpt: "Learn practical strategies to reduce your Next.js bundle size by 60% using dynamic imports, tree shaking, and smart code splitting techniques.",
    readTime: 8,
    difficulty: "Intermediate",
    category: "Performance",
    publishedAt: "2025-01-15",
    slug: "optimizing-nextjs-bundle-size"
  },
  {
    id: 2,
    title: "Building Scalable Architecture: Microservices vs Monolith",
    excerpt: "Deep dive into architectural patterns. When to use microservices, when to stick with monoliths, and how to make the transition seamlessly.",
    readTime: 12,
    difficulty: "Expert",
    category: "Architecture",
    publishedAt: "2025-01-08",
    slug: "microservices-vs-monolith"
  },
  {
    id: 3,
    title: "Database Indexing: The Performance Secret Weapon",
    excerpt: "Understanding database indexes can dramatically improve query performance. Learn when and how to use them effectively in production systems.",
    readTime: 10,
    difficulty: "Intermediate",
    category: "Database",
    publishedAt: "2025-01-01",
    slug: "database-indexing-guide"
  },
  {
    id: 4,
    title: "React Server Components: A Complete Guide",
    excerpt: "Explore the revolutionary React Server Components and how they're changing the way we build modern web applications with better performance.",
    readTime: 15,
    difficulty: "Expert",
    category: "React",
    publishedAt: "2024-12-20",
    slug: "react-server-components-guide"
  },
  {
    id: 5,
    title: "Getting Started with TypeScript in 2025",
    excerpt: "A beginner-friendly introduction to TypeScript. Learn the fundamentals and why TypeScript is becoming the industry standard for JavaScript projects.",
    readTime: 6,
    difficulty: "Beginner",
    category: "TypeScript",
    publishedAt: "2024-12-15",
    slug: "typescript-getting-started"
  },
  {
    id: 6,
    title: "Caching Strategies for High-Traffic Applications",
    excerpt: "Master Redis, CDN, and browser caching strategies to handle millions of requests. Real-world examples from production systems.",
    readTime: 11,
    difficulty: "Expert",
    category: "Performance",
    publishedAt: "2024-12-10",
    slug: "caching-strategies-guide"
  }
]
