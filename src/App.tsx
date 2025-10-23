import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import UsersPage from "./pages/users";
import OrderPage from "./pages/orders";
import TopupPage from "./pages/topup";
import TransactionPage from "./pages/transaction";
import BoostPlanPage from "./pages/boostplan";
import Debug from "@/pages/debug";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ConfirmDialogProvider } from "./components/modals/global-confirm-dialog";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

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
                <Route path="/Orders" element={<OrderPage />} />
                <Route path="/Topup" element={<TopupPage />} />
                <Route path="/Transactions" element={<TransactionPage />} />
                <Route path="/BoostPlans" element={<BoostPlanPage />} />
                <Route path="/Debug" element={<Debug />} />
                <Route path="/Settings" element={<Settings />} />
              </Route>
            </Routes>
            <Toaster />
          </BrowserRouter>
        </ConfirmDialogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
