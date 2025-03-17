class ApiResponse<T> {
  statusCode?: number;
  success: boolean;
  message: string;
  data: T;

  constructor(statusCode: number, success: boolean, message: string, data: T) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };

/* class apiResponse<T> {
  constructor(public success: boolean, public message: string, public data: T) {}
} */


