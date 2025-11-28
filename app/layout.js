import { Geist, Geist_Mono, Grand_Hotel } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import FirebaseConfigNotice from "@/components/FirebaseConfigNotice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const grandHotel = Grand_Hotel({
  weight: '400',
  variable: "--font-grand-hotel",
  subsets: ["latin"],
});

export const metadata = {
  title: "CyberAware - Cybersecurity Awareness Platform",
  description: "Learn about cybersecurity through interactive phishing simulations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${grandHotel.variable} antialiased`}
      >
        <AuthContextProvider>
          {children}
          <FirebaseConfigNotice />
        </AuthContextProvider>
      </body>
    </html>
  );
}
