import { randomUUID } from "crypto";
import { User } from "../types/users.types";

export class UserMemoryRepository {
  private data: User[] = [
    {
      id: randomUUID(),
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+1234567890",
      email: "john.doe@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): User[] {
    return [...this.data];
  }

  findById(id: string): User | undefined {
    return this.data.find(u => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.data.find(u => u.email === email);
  }

  create(user: User): User {
    this.data.push(user);
    return user;
  }

  update(id: string, updates: Partial<User>): User | null {
    const index = this.data.findIndex(u => u.id === id);
    if (index === -1) return null;

    const old = this.data[index];
    const updated = { ...old, ...updates, updatedAt: new Date() };
    this.data[index] = updated;
    return updated;
  }

  deleteById(id: string): boolean {
    const initialLen = this.data.length;
    this.data = this.data.filter(u => u.id !== id);
    return this.data.length < initialLen;
  }
}
