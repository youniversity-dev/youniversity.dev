export interface TextbookSection {
  id: string;
  title: string;
  content: string;
  completed?: boolean;
  duration?: string;
}

export interface TextbookChapter {
  id: string;
  title: string;
  sections: TextbookSection[];
  progress?: number;
}

export interface Textbook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  chapters: TextbookChapter[];
  totalProgress?: number;
  lastAccessed?: Date;
}

export const sampleTextbooks: Textbook[] = [
  {
    id: "calc-1",
    title: "Calculus I: Fundamentals",
    author: "Dr. Sarah Mitchell",
    description: "A comprehensive introduction to differential and integral calculus",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    totalProgress: 35,
    lastAccessed: new Date("2024-01-15"),
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1: Limits and Continuity",
        progress: 100,
        sections: [
          {
            id: "s1-1",
            title: "1.1 Introduction to Limits",
            content: "A limit describes the value that a function approaches as the input approaches some value...",
            completed: true,
            duration: "45 min"
          },
          {
            id: "s1-2",
            title: "1.2 Calculating Limits",
            content: "There are several techniques for calculating limits algebraically...",
            completed: true,
            duration: "60 min"
          },
          {
            id: "s1-3",
            title: "1.3 Continuity",
            content: "A function is continuous at a point if the limit exists and equals the function value...",
            completed: true,
            duration: "30 min"
          },
          {
            id: "s1-4",
            title: "1.4 The Intermediate Value Theorem",
            content: "If a function is continuous on a closed interval, it takes on every value between...",
            completed: true,
            duration: "45 min"
          }
        ]
      },
      {
        id: "ch2",
        title: "Chapter 2: Derivatives",
        progress: 50,
        sections: [
          {
            id: "s2-1",
            title: "2.1 The Derivative as a Limit",
            content: "The derivative of a function at a point is the slope of the tangent line...",
            completed: true,
            duration: "50 min"
          },
          {
            id: "s2-2",
            title: "2.2 Differentiation Rules",
            content: "Basic rules for finding derivatives include the power rule, product rule...",
            completed: true,
            duration: "60 min"
          },
          {
            id: "s2-3",
            title: "2.3 The Chain Rule",
            content: "The chain rule is used to differentiate composite functions...",
            completed: false,
            duration: "45 min"
          },
          {
            id: "s2-4",
            title: "2.4 Implicit Differentiation",
            content: "When a function is defined implicitly, we can still find its derivative...",
            completed: false,
            duration: "40 min"
          }
        ]
      },
      {
        id: "ch3",
        title: "Chapter 3: Applications of Derivatives",
        progress: 0,
        sections: [
          {
            id: "s3-1",
            title: "3.1 Related Rates",
            content: "Related rates problems involve finding the rate of change of one quantity...",
            completed: false,
            duration: "55 min"
          },
          {
            id: "s3-2",
            title: "3.2 Optimization",
            content: "Finding maximum and minimum values of functions using derivatives...",
            completed: false,
            duration: "65 min"
          },
          {
            id: "s3-3",
            title: "3.3 L'Hôpital's Rule",
            content: "A technique for evaluating limits of indeterminate forms...",
            completed: false,
            duration: "35 min"
          }
        ]
      },
      {
        id: "ch4",
        title: "Chapter 4: Integration",
        progress: 0,
        sections: [
          {
            id: "s4-1",
            title: "4.1 Antiderivatives",
            content: "An antiderivative is a function whose derivative is the given function...",
            completed: false,
            duration: "40 min"
          },
          {
            id: "s4-2",
            title: "4.2 The Definite Integral",
            content: "The definite integral represents the area under a curve...",
            completed: false,
            duration: "50 min"
          },
          {
            id: "s4-3",
            title: "4.3 The Fundamental Theorem of Calculus",
            content: "This theorem connects differentiation and integration...",
            completed: false,
            duration: "60 min"
          }
        ]
      }
    ]
  },
  {
    id: "physics-101",
    title: "Physics 101: Mechanics",
    author: "Prof. James Chen",
    description: "Introduction to classical mechanics and motion",
    coverImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=600&fit=crop",
    totalProgress: 15,
    lastAccessed: new Date("2024-01-14"),
    chapters: [
      {
        id: "ph-ch1",
        title: "Chapter 1: Kinematics",
        progress: 60,
        sections: [
          {
            id: "ph-s1-1",
            title: "1.1 Position and Displacement",
            content: "Understanding motion begins with describing position...",
            completed: true,
            duration: "30 min"
          },
          {
            id: "ph-s1-2",
            title: "1.2 Velocity and Speed",
            content: "Velocity is the rate of change of position...",
            completed: true,
            duration: "35 min"
          },
          {
            id: "ph-s1-3",
            title: "1.3 Acceleration",
            content: "Acceleration is the rate of change of velocity...",
            completed: false,
            duration: "40 min"
          }
        ]
      },
      {
        id: "ph-ch2",
        title: "Chapter 2: Forces and Newton's Laws",
        progress: 0,
        sections: [
          {
            id: "ph-s2-1",
            title: "2.1 Newton's First Law",
            content: "An object at rest stays at rest...",
            completed: false,
            duration: "25 min"
          },
          {
            id: "ph-s2-2",
            title: "2.2 Newton's Second Law",
            content: "Force equals mass times acceleration...",
            completed: false,
            duration: "35 min"
          }
        ]
      }
    ]
  },
  {
    id: "cs-intro",
    title: "Introduction to Computer Science",
    author: "Dr. Emily Rodriguez",
    description: "Fundamental concepts in programming and computational thinking",
    coverImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=600&fit=crop",
    totalProgress: 75,
    lastAccessed: new Date("2024-01-16"),
    chapters: [
      {
        id: "cs-ch1",
        title: "Chapter 1: Introduction to Programming",
        progress: 100,
        sections: [
          {
            id: "cs-s1-1",
            title: "1.1 What is Programming?",
            content: "Programming is the process of creating instructions...",
            completed: true,
            duration: "20 min"
          },
          {
            id: "cs-s1-2",
            title: "1.2 Variables and Data Types",
            content: "Variables store data that can be used in programs...",
            completed: true,
            duration: "30 min"
          }
        ]
      },
      {
        id: "cs-ch2",
        title: "Chapter 2: Control Structures",
        progress: 50,
        sections: [
          {
            id: "cs-s2-1",
            title: "2.1 Conditional Statements",
            content: "If-else statements allow programs to make decisions...",
            completed: true,
            duration: "35 min"
          },
          {
            id: "cs-s2-2",
            title: "2.2 Loops",
            content: "Loops allow code to be executed repeatedly...",
            completed: false,
            duration: "40 min"
          }
        ]
      }
    ]
  }
];

export const getCurrentTextbook = (): Textbook => {
  return sampleTextbooks[0];
};

export const getAllTextbooks = (): Textbook[] => {
  return sampleTextbooks;
};