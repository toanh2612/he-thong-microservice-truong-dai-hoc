export const apiRoutes = {
  auth: {
    login: "auth/login",
  },
  user: {
    main: "/user",
    // getList: "/user",
    // updateOne: "/user",
  },
  role: "/role",
  address: "/address",
  subject: "/subject",
  classroom: "/classroom",
  periodTimeRange: "/class-period-time-range",
  classPeriod: "/class-period",
};

export const innerRoutes = {
  login: "/login",
  user: {
    main: "/admin/user",
  },
  subject: {
    main: "/admin/subject",
    create: "/admin/subject/create",
  },
  address: {
    main: "/admin/address",
    create: "/admin/address/create",
  },
  classroom: {
    main: "/admin/classroom",
    create: "/admin/classroom/create",
  },
  periodTimeRange: {
    main: "/admin/class-period-time-range",
    create: "/admin/class-period-time-range/create",
  },
  classPeriod: {
    main: "/admin/class-period",
    create: "/admin/class-period/create",
  },
  student: {
    calendar: "/student/calendar",
    register: "/student/register-class",
    billing: "/student/billing",
  },
  teacherCalendar: {
    main: "/teacher/calendar",
  },
};
