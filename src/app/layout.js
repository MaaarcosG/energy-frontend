import StoreProvider from "./StoreProvider";
import './globals.css'

export const metadata = {
  title: "Nextjs App",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
