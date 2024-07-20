import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavLink } from "./lib/components/nav-link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div>
            <div className="navbar_menu">
              <NavLink href="/lecturers" className="navbar">
                Lecturers
              </NavLink>
              <NavLink href="/lecturers/add" className="navbar">
                Add Lecturer
              </NavLink>
            </div>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
