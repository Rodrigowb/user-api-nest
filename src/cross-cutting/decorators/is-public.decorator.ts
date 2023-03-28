// Nest imports
import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY: any = 'isPublic';
export const IsPublic: any = () => SetMetadata(IS_PUBLIC_KEY, true)

