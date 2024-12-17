export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  preferences?: {
    daily_goal_hours?: number;
    preferred_subjects?: string[];
    notification_settings?: {
      email: boolean;
      push: boolean;
    }
  }
}

export interface StudySession {
  id: string;
  user_id: string;
  subject: string;
  topic: string;
  duration: number;
  confidence_level: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  created_at: string;
}

export interface PracticeTest {
  id: string;
  user_id: string;
  subject: string;
  score: number;
  total_questions: number;
  time_taken: number;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  duration_weeks: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: {
    title: string;
    description: string;
    resources: string[];
  }[];
}

export interface UserProgress {
  user_id: string;
  ai_sessions: number;
  topics_mastered: number;
  practice_tests: number;
  current_rank: number;
  study_streak: number;
  total_study_hours: number;
  subject_progress: Record<string, number>;
}