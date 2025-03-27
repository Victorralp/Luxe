import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme/ThemeProvider'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Initialize theme based on system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = prefersDark ? "dark" : "light";

// Apply initial theme class
document.documentElement.classList.add(initialTheme);
document.documentElement.style.setProperty('color-scheme', initialTheme);

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme={initialTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
