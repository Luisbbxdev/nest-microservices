import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createUserDto } from './dto/create-user.dto';
import { CreateUserEvent } from './events/create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(request: createUserDto) {
    this.users.push(request);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(request.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(request.email),
    );
  }

  async getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
