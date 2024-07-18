export interface IBaseProps {
  head: IHead;
  isSmooth?: boolean;
  isPublic?: boolean;
  currentPage: string;
}
export interface IHead {
  title: string;
  description: string;
}

export interface IResponse {
  success: boolean;
  message: string;
  data?: unknown;
  total?: number;
}
