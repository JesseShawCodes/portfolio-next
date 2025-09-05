import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

import React from 'react';
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import BootstrapClient from "./components/BootstrapClient";

import FloatingControls from "./components/FloatingControls/FloatingControls";
import Script from 'next/script';

export const metadata = {
  title: "Jesse Shaw | Full Stack Developer",
  metadataBase: new URL('https://jesse-shaw.netlify.app'),
  icons: {
    icon: "/favicon.png",
  },
  description: "Full stack developer with expertise in React, Ruby on Rails, and headless CMS technologies. Let's build something great together!",
  openGraph: {
    title: "Jesse Shaw | Full Stack Developer",
    description: "Full stack developer with expertise in React, Ruby on Rails, and headless CMS technologies. Let's build something great together!",
    url: "https://jesse-shaw.netlify.app",
    siteName: "Jesse Shaw | Full Stack Developer",
    images: [
        {
            url: '/opengraph-image.png', // Or a full URL for external images
            alt: 'Jesse Shaw | Full Stack Developer',
        },
    ],
}
};

export default async function RootLayout({ children }) {
  // let dataLayer = window.dataLayer || [];
  const GA_MEASUREMENT_ID = 'G-XM96SQ4MGL';
  return (
    <html lang="en">
      <body>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy='afterInteractive'/>
          <Script id="ga-init" strategy='afterInteractive'>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag() {dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `
            }
          </Script>
        <ThemeProvider>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1">
            {children}
          </main>
          <FloatingControls />
          <Footer />
        </div>
        </ThemeProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
