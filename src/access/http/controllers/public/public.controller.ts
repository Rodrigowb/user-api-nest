// Nest imports
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Query, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { request } from 'http';

// Files import

@ApiTags('Public')
@Controller()
export class PublicController{
  public constructor(private readonly application: PublicApplication) { }
  
  @IsPublic()
  @ApiOperation({ summary: 'Login to the system' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  @UsingTransaction()
  @ExceptionInterceptor()
  public async login(@Body() request: LoginRequest) {
    return await this.application.login(request)
  }
}