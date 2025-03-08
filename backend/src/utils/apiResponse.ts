class apiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export { apiResponse };

/* class apiResponse<T> {
  constructor(public success: boolean, public message: string, public data: T) {}
} */


