import { SubjectResponseType } from "../subject/SubjectResponse";

export type ClassroomResponseType = {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  subject?: SubjectResponseType;
  teacher?: any[];
  student?: any[];
};
