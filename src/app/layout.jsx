import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import BootstrapClient from "./components/BootstrapClient";

export const metadata = {
  title: "Jesse Shaw - Full Stack Developer",
  description: "Full stack developer with expertise in React, Ruby on Rails, and headless CMS technologies. Let's build something great together!",
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
        </div>
        </ThemeProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
