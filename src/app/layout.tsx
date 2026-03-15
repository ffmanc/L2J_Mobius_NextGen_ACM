import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { LoadingScreen } from "@/components/common/LoadingScreen";

// Instantiate the Inter font subset for optimal loading
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L2J Mobius NextGen ACM",
  description: "Next Generation Account Control Panel for L2J Mobius",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// This script runs BEFORE React hydration, preventing any theme flash.
// It reads from localStorage and applies the correct class immediately.
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('l2j_theme');
    var resolved;
    if (!saved || saved === 'dark') {
      // Default to dark — this app targets game server admins who prefer dark mode.
      // Also handles the case where Chrome ignores OS dark preference.
      resolved = 'dark';
    } else if (saved === 'light') {
      resolved = 'light';
    } else {
      // saved === 'system': respect matchMedia honestly
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
    document.documentElement.style.colorScheme = resolved;
  } catch(e) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: runs synchronously before body renders, no FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <LoadingScreen />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
