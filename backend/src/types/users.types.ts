export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserFormData = Omit<User, "id" | "createdAt" | "updatedAt">;
