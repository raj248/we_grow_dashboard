import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
// const Dashboard = React.lazy(() => import("@/pages/dashboard"));
import UsersPage from "./pages/users";
import Debug from "@/pages/debug";
import Settings from "@/pages/settings";
import Trash from "@/pages/trash";
import Login from "@/pages/login";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ConfirmDialogProvider } from "./components/modals/global-confirm-dialog";
import { AuthProvider } from "@/context/auth-context";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <ConfirmDialogProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Users" element={<UsersPage />} />
                <Route path="/Debug" element={<Debug />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Trash" element={<Trash />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConfirmDialogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
