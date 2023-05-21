import { innerRoutes } from "./apiRoutes";

export const adminPages = [
  {
    title: "User",
    route: innerRoutes.user.main,
  },
  {
    title: "Subject",
    route: innerRoutes.subject.main,
  },
  {
    title: "Address",
    route: innerRoutes.address.main,
  },
  {
    title: "Classroom",
    route: innerRoutes.classroom.main,
  },
  {
    title: "Class time range",
    route: innerRoutes.periodTimeRange.main,
  },
  {
    title: "Class period",
    route: innerRoutes.classPeriod.main,
  },
];

export const studentPages = [
  {
    title: "Calendar",
    route: innerRoutes.student.calendar,
  },
  {
    title: "Register",
    route: innerRoutes.student.register,
  },
  {
    title: "Billing",
    route: innerRoutes.student.billing,
  },
];
export const teacherPages = [
  {
    title: "Calendar",
    route: innerRoutes.teacherCalendar.main,
  },
];

// const switchPages = () => {
//     switch (key) {
//         case value:

//             break;

//         default:
//             break;
//     }
// }
