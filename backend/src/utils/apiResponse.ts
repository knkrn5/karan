class apiResponse<T> {
  success: boolean;
  status: string;
  message: string;
  data: T;
  constructor(success: boolean, status: string, message: string, data: T) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export {apiResponse}