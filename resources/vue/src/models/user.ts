export interface CreateUserPayload {
  name: string;
  company_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  company_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
