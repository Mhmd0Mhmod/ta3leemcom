import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "./useCookies.js";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loction = useLocation().pathname;
  const { remove } = useCookies();

  function logout() {
    queryClient.removeQueries(["user"]);
    remove("user");
    if (loction.includes("Dashboard")) {
      navigate("/");
    }
    toast.success("تم تسجيل الخروج بنجاح");
  }

  return logout;
}
