import { AddressResponseType } from "../address/AddressResponse";
import { ClassPeriodTimeRangeResponse } from "../class-period-time-range/ClassPeriodTimeRangeResponse";
import { ClassroomResponseType } from "../classroom/ClassroomResponse";
import { SubjectResponseType } from "../subject/SubjectResponse";

export type ClassPeriodResponse = {
  id: string;
  addressId: string;
  classPeriodTimeRangeId: string;
  classroomId: string;
  dateTime: string;
  description: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  address: AddressResponseType;
  classroom: ClassroomResponseType;
  classPeriodTimeRange: ClassPeriodTimeRangeResponse;
  subjectId?: string;
  subject?: SubjectResponseType;
};
