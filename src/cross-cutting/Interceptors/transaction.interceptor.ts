// Nest imports
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Scope } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Sequelize, Transaction } from 'sequelize';
import { catchError, Observable, tap } from "rxjs";

// Files import
import { ProviderNames } from "../constants/provider-names.constants";
import { SessionService } from "src/services/session/session.service";
import { USING_TRANSACTION_KEY } from "../decorators/using-transaction.decorator";

@Injectable({ scope: Scope.REQUEST })
export class TransactionInterceptor implements NestInterceptor{
  public constructor(
    @Inject(ProviderNames.sequelize) private readonly sequelize: Sequelize,
    private readonly session: SessionService,
    private readonly reflector: Reflector
  ) { }
  
  public async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const usingTransaction: boolean = this.reflector.getAllAndOverride<boolean>(USING_TRANSACTION_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    this.session.setTransaction(null);

    if (!usingTransaction) {
      return next.handle();
    }

    const transaction: Transaction = await this.sequelize.transaction();
    this.session.setTransaction(transaction);
    return next.handle().pipe(
      tap(async () => {
        await transaction.commit();
      }),
      catchError(async (error: any) => {
        await transaction.rollback();
        throw error;
      })
    )
  }
}