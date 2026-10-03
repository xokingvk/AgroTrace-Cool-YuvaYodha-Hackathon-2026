import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata = {
  title: 'AgroTrace Cool | Farm-Gate Produce Cooling & Monitoring',
  description: 'AgroTrace Cool is a low-cost post-harvest cooling and monitoring system designed for Farmer Producer Organizations and rural agricultural collection centres. Cool the Produce. Preserve the Freshness.',
  keywords: 'AgroTrace Cool, post-harvest cooling, FPO, farm-gate cooling, agricultural monitoring, evaporative cooling, produce temperature',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark bg-[#0D1117]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Anti-theme-flash script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0D1117] text-[#F0F3F0] font-sans antialiased selection:bg-[#21262D] selection:text-[#39FF14]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
