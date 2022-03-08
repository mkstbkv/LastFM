export interface User {
  _id: string,
  email: string,
  displayName: string,
  avatar: string | null,
  token: string,
}

export interface RegisterUserData {
  [key: string]: any;
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    displayName: FieldError
  }
}
