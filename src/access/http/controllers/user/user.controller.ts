// Nest imports
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

// Files import
import { AppConstants } from 'src/cross-cutting/constants/app.constants';
import { RoleGuard } from 'src/cross-cutting/guards/role-auth.guard';
import { User } from 'src/db/models/user';
import { UserApplication } from 'src/application/user.application';

@ApiTags('Users')
@Controller('users')
export class UserController{
  public constructor(private readonly application: UserApplication) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([AppConstants.ROLES.MASTER, AppConstants.ROLES.ADMIN]))
  public async list(): Promise<User[]>{
    const users: User[] = await this.application.list();
    return users;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find user by id' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  @ApiBearerAuth('access-token')
  public async find(@Param('id') id: string): Promise<User> {
      return await this.application.find(id);
  }

}