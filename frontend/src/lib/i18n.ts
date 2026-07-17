// Lightweight i18n for ECHO's UI chrome.
// English is the source language; Hindi is fully translated. Any other
// selected language gracefully falls back to English until its dictionary
// is added. The voice tutor already speaks the chosen language via the AI.

import { useAppStore } from './store';

type Dict = Record<string, string>;

const en: Dict = {
  'nav.home': 'Home',
  'nav.tutor': 'Tutor',
  'nav.rewards': 'Rewards',
  'nav.pricing': 'Pricing',
  'nav.login': 'Log in',
  'nav.signin': 'Sign in',
  'nav.logout': 'Log out',
  'side.settings': 'Settings',
  'side.pricing': 'Pricing',
  'side.language': 'Language',
  'dash.subjects': 'Subjects',
  'dash.continue': 'Continue where you left off',
  'dash.picks': "Today's picks",
  'dash.streak': 'Streak',
  'dash.xp': 'XP',
  'dash.badges': 'Badges',
  'dash.ready': "Ready for today's little adventure?",
  'auth.welcomeBack': 'Welcome Back!',
  'auth.readyNew': 'Ready to learn something new?',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.name': 'Your Name',
  'auth.parentEmail': "Parent's Email",
  'auth.alreadyAccount': 'Already have an account?',
  'auth.noAccount': "Don't have an account?",
  'auth.startFree': 'Start free',
  'auth.welcomeECHO': 'Welcome to ECHO',
  'auth.setupProfile': "Let's set up your learning profile.",
  'auth.choosePlan': 'Choose a Plan',
  'auth.changeLater': 'You can always change this later.',
  'auth.free': 'Free',
  'auth.premium': 'Premium',
  'auth.accessibility': 'Accessibility Needs',
  'auth.howCan': 'How can we make ECHO best for you?',
  'auth.startLearning': 'Start Learning',
  'auth.nextStep': 'Next Step',
  'auth.back': 'Back',
  'auth.logInLink': 'Log in',
  'tutor.chooseTopic': 'Choose a Topic',
  'tutor.chapters': 'Chapters',
  'tutor.listening': 'Listening...',
  'tutor.tapMic': 'Tap the mic to speak',
  'tutor.voiceSettings': 'Voice settings',
  'tutor.session': 'Session',
  'tutor.topics': 'Topics',
  'tutor.speechPace': 'Speech pace',
  'tutor.slow': 'Slow',
  'tutor.fast': 'Fast',
  'tutor.voiceInput': 'Voice input needs Chrome or Edge. You can still type your questions.',
};

const hi: Dict = {
  'nav.home': 'होम',
  'nav.tutor': 'ट्यूटर',
  'nav.rewards': 'इनाम',
  'nav.pricing': 'प्राइसिंग',
  'nav.login': 'लॉग इन',
  'nav.signin': 'साइन इन',
  'nav.logout': 'लॉग आउट',
  'side.settings': 'सेटिंग्स',
  'side.pricing': 'प्राइसिंग',
  'side.language': 'भाषा',
  'dash.subjects': 'विषय',
  'dash.continue': 'जहाँ से छोड़ा था, वहाँ से जारी रखें',
  'dash.picks': 'आज की पसंद',
  'dash.streak': 'लगातार दिन',
  'dash.xp': 'अनुभव अंक',
  'dash.badges': 'बैज',
  'dash.ready': 'आज की छोटी सी साहसिक यात्रा के लिए तैयार?',
  'auth.welcomeBack': 'वापसी पर स्वागत है!',
  'auth.readyNew': 'कुछ नया सीखने के लिए तैयार?',
  'auth.email': 'ईमेल',
  'auth.password': 'पासवर्ड',
  'auth.name': 'आपका नाम',
  'auth.parentEmail': "अभिभावक का ईमेल",
  'auth.alreadyAccount': 'क्या आपका खाता है?',
  'auth.noAccount': 'खाता नहीं है?',
  'auth.startFree': 'मुफ्त शुरू करें',
  'auth.welcomeECHO': 'ईको में आपका स्वागत है',
  'auth.setupProfile': 'आइए अपनी सीखने की प्रोफ़ाइल सेट करें।',
  'auth.choosePlan': 'योजना चुनें',
  'auth.changeLater': 'आप इसे बाद में बदल सकते हैं।',
  'auth.free': 'मुफ्त',
  'auth.premium': 'प्रीमियम',
  'auth.accessibility': 'सुलभता ज़रूरतें',
  'auth.howCan': 'हम ईको को आपके लिए सबसे अच्छा कैसे बनाएँ?',
  'auth.startLearning': 'सीखना शुरू करें',
  'auth.nextStep': 'अगला चरण',
  'auth.back': 'वापस',
  'auth.logInLink': 'लॉग इन',
  'tutor.chooseTopic': 'विषय चुनें',
  'tutor.chapters': 'अध्याय',
  'tutor.listening': 'सुन रहे हैं...',
  'tutor.tapMic': 'बोलने के लिए माइक दबाएँ',
  'tutor.voiceSettings': 'आवाज़ सेटिंग्स',
  'tutor.session': 'सत्र',
  'tutor.topics': 'विषय',
  'tutor.speechPace': 'बोलने की गति',
  'tutor.slow': 'धीमी',
  'tutor.fast': 'तेज़',
  'tutor.voiceInput': 'आवाज़ इनपुट के लिए क्रोम या एज चाहिए। आप अपने सवाल टाइप कर सकते हैं।',
};

const DICTS: Record<string, Dict> = { en, hi };

export function translate(lang: string, key: string): string {
  const dict = DICTS[lang];
  if (dict && dict[key] != null) return dict[key];
  return en[key] ?? key;
}

export function useT() {
  const { state } = useAppStore();
  return (key: string) => translate(state.language, key);
}
