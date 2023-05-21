import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth";
import {
  authorizedAdminRoutes,
  studentRoutes,
  teacherRoutes,
  unauthorizedRoutes,
} from "@/constant/common";
import { authenticationSelector } from "@/redux/authentication";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, role } = useSelector(authenticationSelector);
  const [cookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const router = useRouter();

  useEffect(() => {
    if (
      role === "admin" &&
      cookie?.token &&
      unauthorizedRoutes.includes(router.pathname)
    ) {
      router.push("/admin/user");
    } else if (
      role === "teacher" &&
      cookie?.token &&
      teacherRoutes.includes(router.pathname)
    ) {
      router.push("/teacher/calendar");
    } else if (
      role === "student" &&
      cookie?.token &&
      studentRoutes.includes(router.pathname)
    ) {
      router.push("/student/calendar");
    }

    if (!cookie?.token) {
      router.push("/login");
    }
  }, [isLoggedIn, cookie.token]);
  return <>{children}</>;
};
