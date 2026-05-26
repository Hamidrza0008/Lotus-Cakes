import "./globals.css";
import ReduxProvider from "../redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "@/Components/LayoutWrapper/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#fff5f7" }}
      >
        <ReduxProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>

          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}