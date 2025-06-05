"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FooterSecondary from "./FooterSecondary";
import NavbarSecondary from "./NavbarSecondary";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showPrimaryNavbarAndFooter = !(
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/forgot")
  );

  return (
    <>
      {showPrimaryNavbarAndFooter ? <Navbar /> : <div className="w-full max-h-[7rem] overflow-hidden"><NavbarSecondary/></div>}
      {children}
      {showPrimaryNavbarAndFooter ? <Footer/> : <FooterSecondary />}
    </>
  );
}
