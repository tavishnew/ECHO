import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Tier = 'free' | 'premium';
export type AccessibilityPref = 'None' | 'Cognitive' | 'Low Vision' | 'Hard of Hearing' | 'Limited Internet';

export interface User {
  name: string;
  email: string;
  tier: Tier;
  accessibilityPreference: AccessibilityPref;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  category: 'cosmetic' | 'perk';
}

export interface AppState {
  user: User | null;
  points: number;
  streak: number;
  completedChapters: string[];
  purchasedRewards: string[];
  highContrast: boolean;
  textSize: 'normal' | 'large';
  language: string;
}

interface AppContextType {
  state: AppState;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addPoints: (amount: number) => void;
  buyReward: (rewardId: string, cost: number) => boolean;
  completeChapter: (chapterId: string) => void;
  toggleHighContrast: () => void;
  toggleTextSize: () => void;
  setLanguage: (code: string) => void;
}

const defaultState: AppState = {
  user: null,
  points: 0,
  streak: 0,
  completedChapters: [],
  purchasedRewards: [],
  highContrast: false,
  textSize: 'normal',
  language: 'en',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('echoedu_state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('echoedu_state', JSON.stringify(state));
    
    // Apply accessibility settings to document
    if (state.highContrast) {
      document.documentElement.classList.add('contrast-more');
    } else {
      document.documentElement.classList.remove('contrast-more');
    }

    if (state.textSize === 'large') {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }
  }, [state]);

  const login = (user: User) => setState(s => ({ ...s, user }));
  const logout = () => setState(s => ({ ...s, user: null }));
  const updateUser = (updates: Partial<User>) => setState(s => ({ ...s, user: s.user ? { ...s.user, ...updates } : null }));
  
  const addPoints = (amount: number) => setState(s => ({ ...s, points: s.points + amount }));
  
  const buyReward = (rewardId: string, cost: number) => {
    if (state.points >= cost && !state.purchasedRewards.includes(rewardId)) {
      setState(s => ({
        ...s,
        points: s.points - cost,
        purchasedRewards: [...s.purchasedRewards, rewardId]
      }));
      return true;
    }
    return false;
  };

  const completeChapter = (chapterId: string) => {
    if (!state.completedChapters.includes(chapterId)) {
      setState(s => ({
        ...s,
        completedChapters: [...s.completedChapters, chapterId],
        points: s.points + 50,
        streak: s.streak === 0 ? 1 : s.streak
      }));
    }
  };

  const toggleHighContrast = () => setState(s => ({ ...s, highContrast: !s.highContrast }));
  const toggleTextSize = () => setState(s => ({ ...s, textSize: s.textSize === 'normal' ? 'large' : 'normal' }));

  const setLanguage = (code: string) => setState(s => ({ ...s, language: code }));

  return (
    <AppContext.Provider value={{ state, login, logout, updateUser, addPoints, buyReward, completeChapter, toggleHighContrast, toggleTextSize, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
