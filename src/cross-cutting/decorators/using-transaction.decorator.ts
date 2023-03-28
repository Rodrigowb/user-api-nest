// Nest imports
import { SetMetadata } from "@nestjs/common";

export const USING_TRANSACTION_KEY: any = 'usingTransaction';
export const usingTransaction: any = () => SetMetadata(USING_TRANSACTION_KEY, true)

