import { navItems } from "@/nav-items";
import { Outlet } from "react-router-dom";
import { DesktopNavbar } from "./_components/DesktopNavbar";
import { MobileSheet } from "./_components/MobileSheet";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-secondary/80 backdrop-blur-sm px-4 md:px-6 justify-between shadow-sm">
        <div className="flex items-center">
          <img src="/swedish-flag.png" alt="Swedish Flag" className="h-8 w-12 mr-4" />
          <DesktopNavbar navItems={navItems} />
        </div>
        <MobileSheet navItems={navItems} />
      </header>
      <main className="flex-grow overflow-auto p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="border-t bg-secondary/80 backdrop-blur-sm py-4 text-center text-sm text-muted-foreground">
        © 2024 Swedish Hacker News Reader. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;