import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

import React from 'react';
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import BootstrapClient from "./components/BootstrapClient";

import FloatingControls from "./components/FloatingControls/FloatingControls";
import Script from 'next/script';
import { TerminalProvider } from './context/TerminalContext';
import { getLocale } from '../config/locale';

const { site } = getLocale();

export const metadata = {
  title: site.title,
  metadataBase: new URL(site.url),
  icons: {
    icon: "/favicon.png",
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
    images: [
        {
            url: '/opengraph-image.png',
            alt: site.openGraphImageAlt,
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
        <TerminalProvider>
          <ThemeProvider>
            <div className="d-flex flex-column min-vh-100">
              <NavBar />
              <main className="flex-grow-1  bg-gradient-my-gradient">
                {children}
              </main>
              <FloatingControls />
              <Footer />
            </div>
          </ThemeProvider>
        </TerminalProvider>
        <BootstrapClient />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
