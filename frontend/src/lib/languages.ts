export interface Language {
  /** App-internal code, also used as the i18n key. */
  code: string;
  /** BCP-47 tag for Web Speech API (recognition + synthesis). */
  bcp47: string;
  /** English label. */
  name: string;
  /** Native-script label. */
  native: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', bcp47: 'en-IN', name: 'English', native: 'English' },
  { code: 'hi', bcp47: 'hi-IN', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', bcp47: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', bcp47: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', bcp47: 'mr-IN', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', bcp47: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', bcp47: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', bcp47: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', bcp47: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', bcp47: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export const getLanguage = (code: string): Language =>
  LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
