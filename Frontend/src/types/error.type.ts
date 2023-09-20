export interface IGenericError {
  message: string;
  response: {
    data: {
      status: number;
      message: string;
    };
  };
}
