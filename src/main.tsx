
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check for user's preferred color scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', prefersDark);

createRoot(document.getElementById("root")!).render(<App />);
