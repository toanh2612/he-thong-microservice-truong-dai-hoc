import { ReactNode } from "react";

export interface CommonResponseType<T> {
  success: boolean;
  result: T;
  message: string;
  statusCode: number;
}

export interface CommonListResultType<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalRows: number;
}

export type QueryParams = {
  id?: string;
  page?: number;
  perPage?: number;
  allParams?: { [key: string]: string };
  keySort?: string;
  sortField?: string;
  isDeleted?: boolean;
} & { [key: string]: string | number | boolean };

export type PseudoType =
  | "hover"
  | "active"
  | "focus"
  | "disabled"
  | "selected"
  | "none";
export type ColorType =
  | "primary"
  | "success"
  | "secondary"
  | "warning"
  | "error"
  | "gradient";
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl";
