import { CONFIG } from "../configs/config";

export const CONSTANT = {
  SERVICE_NAME: CONFIG.SERVICE_NAME,
  EVENT: {
    USER: {
      GET_USER_LIST_BY_IDS: "USER.GET_USER_LIST_BY_IDS",
      GET_USER_BY_ID: "USER.GET_USER_BY_ID",
      AUTH: "USER.AUTH",
    },
    SCHEDULE: {
      UPDATE_CLASSROOM_SUCCESSED: "SCHEDULE.UPDATE_CLASSROOM",
      UPDATE_CLASS_PERIOD_SUCCESSED: "SCHEDULE.UPDATE_CLASS_PERIOD",
      UPDATE_CLASS_PERIOD_TIME_RANGE_SUCCESSED:
        "SCHEDULE.UPDATE_CLASS_PERIOD_TIME_RANGE",
      CREATE_ATTENDANCE_SUCCESSED: "SCHEDULE.CREATE_ATTENDANCE_SUCCESSED",
      UPDATE_ATTENDANCE_SUCCESSED: "SCHEDULE.UPDATE_ATTENDANCE_SUCCESSED",
    },
    PAYMENT: {
      CREATE_ORDER_SUCCESSED: "PAYMENT.CREATE_ORDER_SUCCESSED",
      CREATE_ORDER_FAILED: "PAYMENT.CREATE_ORDER_FAILED",
      PAYMENT_SUCCESSED: "PAYMENT.PAYMENT_SUCCESSED",
      PAYMENT_FAILED: "PAYMENT.PAYMENT_FAILED",
    },
    NOTIFICATION: {},
  },
  COMMAND: {
    USER: {},
    SCHEDULE: {},
    PAYMENT: {
      CREATE_ORDER: "PAYMENT.CREATE_ORDER",
    },
    NOTIFICATION: {
      SEND_EMAIL: "NOTIFICATION.SEND_MAIL",
      SEND_NOTIFICATION: "NOTIFICATION.SEND_NOTIFICATION",
      SEND_NOTIFICATION_AND_MAIL: "NOTIFICATION.SEND_NOTIFICATION_AND_MAIL",
    },
  },
  CALL_OTHER_SERVICE_TIMEOUT: 10000,
  RABBITMQ: {
    CONNECTION_URL: "amqp://edu_microservice:edu_microservice%40@localhost",
    CHANNEL_TYPE: {
      RECEIVE: "receive",
      SEND: "send",
    },
  },
  ERROR: {
    E0000: {
      code: "E0000",
      httpStatusCode: 500,
      message: "General error",
    },
    E0001: {
      code: "E0001",
      httpStatusCode: 402,
      message: "Invalid username or email",
    },
    E0002: {
      code: "E0002",
      httpStatusCode: 404,
      message: "User not found",
    },
    E0003: {
      code: "E0003",
      httpStatusCode: 401,
      message: "Password is wrong",
    },
    E0004: {
      code: "E0004",
      httpStatusCode: 403,
      message: "Not permission",
    },
    E0005: {
      code: "E0005",
      httpStatusCode: 500,
      message: "Can't conntect rabbitMQ",
    },
    E0006: {
      code: "E0006",
      httpStatusCode: 401,
      message: "Unauthorizated",
    },
  },
};
