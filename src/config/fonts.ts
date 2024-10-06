// import fonts from next/font/google
import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";

// Define JetBrains Mono and Inter fonts
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// If using a custom import for Operator Mono, add it separately
export const operatorMono = {
  fontFamily: "Operator Mono, monospace",
};
