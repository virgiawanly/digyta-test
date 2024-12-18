export interface FormattedApiError {
  status?: number | string;
  error: boolean;
  message: string;
  errors: any;
}
