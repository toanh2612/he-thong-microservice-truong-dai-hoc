export const authorizedAdminRoutes = [
  "/admin/user",
  "/admin/subject",
  "/admin/address",
  "/admin/class-priod",
  "/admin/classroom",
  "/admin/class-priod-time-range",
];
export const studentRoutes = ["/student/calendar"];
export const teacherRoutes = ["/teacher/calendar"];
// "/user"
export const unauthorizedRoutes = ["/login", "/"];

export enum RoleEnum {
  STUDENT = "student",
  ADMIN = "admin",
  TEACHER = "teacher",
}
