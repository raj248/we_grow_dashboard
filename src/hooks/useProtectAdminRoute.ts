import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminSession } from "@/services/adminApi"; // must return { success, data: { isAdmin } }

export const useProtectAdminRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await checkAdminSession();
        // const res = { success: true, data: { isAdmin: true } }; // dummy
        if (!res.success || !res.data?.isAdmin) {
          // alert("Session expired or unauthorized access.");
          navigate("/", { replace: true });
        }
      } catch (err) {
        // alert("Error validating session.");
        navigate("/", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);
};
