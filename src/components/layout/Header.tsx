import Link from "next/link";
import { CustomIcon } from "../CustomIcon";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { logout } from "@/modules/auth/dbAuthUtils";
import { pb } from "@/config/pocketbaseConfig";
import { useCurrentUserStore } from "@/stores/authDataStore";
import { useForceSidebarOpenStore } from "@/stores/useForceSidebarOpenStore";

export function Header() {
  const currentUserStore = useCurrentUserStore();
  const forceSidebarOpenStore = useForceSidebarOpenStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 flex-1 items-center justify-between px-6">
        <div className="flex">
          <Button
            className="flex md:hidden"
            variant="ghost"
            onClick={() => forceSidebarOpenStore.setData(!forceSidebarOpenStore.data)}
          >
            <CustomIcon iconName="MenuIcon" size="md" />
          </Button>
          <Link
            href="/"
            className="hidden items-center gap-2 transition-opacity hover:opacity-80 sm:flex"
          >
            <CustomIcon iconName="Cloud" size="lg" />
            <span className="font-bold">pokkit messenger</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-2">
          {currentUserStore.data.authStatus === "loggedIn" && (
            <Button variant="outline" onClick={() => logout({ pb })}>
              <CustomIcon iconName="LogOut" size="md" />
              Log Out
            </Button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
