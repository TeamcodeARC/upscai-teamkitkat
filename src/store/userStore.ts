import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { UserProfile, UserProgress, StudySession, PracticeTest } from '../types';

interface UserState {
  profile: UserProfile | null;
  progress: UserProgress | null;
  loading: boolean;
  error: string | null;
  studySessions: StudySession[];
  practiceTests: PracticeTest[];
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addStudySession: (session: Omit<StudySession, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  addPracticeTest: (test: Omit<PracticeTest, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  fetchUserData: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  progress: null,
  loading: true,
  error: null,
  studySessions: [],
  practiceTests: [],

  updateProfile: async (data) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', get().profile?.id);

      if (error) throw error;
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addStudySession: async (session) => {
    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .insert([
          {
            ...session,
            user_id: get().profile?.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Update progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .update({
          ai_sessions: get().progress!.ai_sessions + 1,
          total_study_hours: get().progress!.total_study_hours + Math.floor(session.duration / 60),
        })
        .eq('user_id', get().profile?.id);

      if (progressError) throw progressError;

      set((state) => ({
        studySessions: [...state.studySessions, data],
        progress: state.progress ? {
          ...state.progress,
          ai_sessions: state.progress.ai_sessions + 1,
          total_study_hours: state.progress.total_study_hours + Math.floor(session.duration / 60),
        } : null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addPracticeTest: async (test) => {
    try {
      const { data, error } = await supabase
        .from('practice_tests')
        .insert([
          {
            ...test,
            user_id: get().profile?.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Update progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .update({
          practice_tests: get().progress!.practice_tests + 1,
        })
        .eq('user_id', get().profile?.id);

      if (progressError) throw progressError;

      set((state) => ({
        practiceTests: [...state.practiceTests, data],
        progress: state.progress ? {
          ...state.progress,
          practice_tests: state.progress.practice_tests + 1,
        } : null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchUserData: async () => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabase.auth.getUser().then(res => res.data.user?.id))
        .single();

      if (profileError) throw profileError;

      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', profile.id)
        .single();

      if (progressError) throw progressError;

      const { data: sessions, error: sessionsError } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (sessionsError) throw sessionsError;

      const { data: tests, error: testsError } = await supabase
        .from('practice_tests')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (testsError) throw testsError;

      set({
        profile,
        progress,
        studySessions: sessions,
        practiceTests: tests,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));