import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  getHello(): string {
    return 'Hello World!';
  }
}
