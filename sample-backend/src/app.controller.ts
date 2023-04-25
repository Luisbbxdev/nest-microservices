import { Body, Controller, Get, Post } from '@nestjs/common';
import { request } from 'http';
import { AppService } from './app.service';
import { createUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() request: createUserDto) {
    this.appService.createUser(request);
  }

  @Get('analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
