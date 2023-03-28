// Nest imports
import { Injectable, Scope } from "@nestjs/common";
import { Transaction } from "sequelize";

// Files import

@Injectable({ scope: Scope.REQUEST })
export class SessionService{
  private user: User;
  private transaction: Transaction;

  public getUser(): User {
    return this.user as User;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getTransaction(): Transaction | null{
    return this.transaction ?? null;
  }

  public setTransaction(transaction: Transaction): void {
    this.transaction = transaction;
  }

  public isMasterUser(): boolean {
    return this.user?.role == AppConstants.ROLES.MASTER
  }
}