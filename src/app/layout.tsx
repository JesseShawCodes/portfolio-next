import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

import React from 'react';
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import BootstrapClient from "./components/BootstrapClient";
import BackToTop from './components/BackToTop';

export const metadata = {
  title: "Jesse Shaw - Full Stack Developer",
  icons: {
    icon: "/favicon.png",
  },
  description: "Full stack developer with expertise in React, Ruby on Rails, and headless CMS technologies. Let's build something great together!",
  openGraph: {
    title: "Jesse Shaw - Full Stack Developer",
    description: "Full stack developer with expertise in React, Ruby on Rails, and headless CMS technologies. Let's build something great together!",
    url: "https://jesse-shaw.netlify.app",
    siteName: "Jesse Shaw - Full Stack Developer"
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1">
            {children}
          </main>
          <Footer />
          <BackToTop/>
        </div>
        </ThemeProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
