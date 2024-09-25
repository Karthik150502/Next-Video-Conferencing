import type { Metadata } from "next";
import "./globals.css";
import { montserrat300 } from "./fonts/montserrat";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import 'react-datepicker/dist/react-datepicker.css'

export const metadata: Metadata = {
  title: "Doorbin",
  description: "Streamlined Video Conferencing",
  icons: {
    icon: "../Asset/doorbin-favicon-black.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "../Asset/svg/logo-no-background.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "#FFF",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1C1E",
            colorInputBackground: "#252A41",
            colorInputText: "#FFF",
          },


        }}>
        <body
          className={`${montserrat300.className} bg-dark-3 antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
