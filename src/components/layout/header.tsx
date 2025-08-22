import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { AppBreadcrumbs } from "./app-breadcrumbs";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
// import { logoutAdmin } from '@/lib/api'
import { useNavigate } from "react-router-dom";

function Header() {
  const navigator = useNavigate();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium mr-4">Admin Panel </h1>
        <AppBreadcrumbs />

        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/raj248/institute_app"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
          <Button
            variant="outline"
            asChild
            size="sm"
            className="hidden sm:flex cursor-pointer"
            onClick={() => {
              // logoutAdmin()
              navigator("/");
            }}
          >
            <a className="dark:text-foreground">Logout</a>
          </Button>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
