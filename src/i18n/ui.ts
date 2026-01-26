export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.blog': 'Blog',
    'nav.docs': 'Docs',
    'nav.github': 'GitHub_',
    'status.available': 'Disponible',
    'chat.welcome':
      '> SYSTEM_INIT... Hola, soy el gemelo digital de Andres. ¿En qué puedo ayudarte hoy?',
    'chat.placeholder': 'Pregunta algo...',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.blog': 'Blog',
    'nav.docs': 'Docs',
    'nav.github': 'GitHub_',
    'status.available': 'Open to Work',
    'chat.welcome': "> SYSTEM_INIT... Hi, I am Andres' digital twin. How can I help you today?",
    'chat.placeholder': 'Ask something...',
  },
} as const;
