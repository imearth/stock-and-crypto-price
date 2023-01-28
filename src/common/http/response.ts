import { HttpStatus } from '@nestjs/common';
export class HTTPResponse {
  data?: any;

  statusCode: HttpStatus;

  message: string;

  timestamp: string;

  metadata?: any;

  error?: Error;
}
