import {
  Controller,
  Get,
  Query,
  HttpStatus,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { HTTPResponse } from 'src/common/http/response';
import { Result } from 'src/common/result/result';
import { CryptoService } from './crypto.service';

@UseInterceptors(CacheInterceptor)
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('price')
  async getStockPrice(@Query('symbol') symbol) {
    const result = await this.cryptoService.getCryptoPrice(
      symbol?.toUpperCase(),
    );
    if (result instanceof Result) {
      const response: HTTPResponse = {
        statusCode: HttpStatus.OK,
        message: 'Get crypto price successfully.',
        timestamp: new Date().toISOString(),
        data: result.data,
      };
      return response;
    }

    const responseError: HTTPResponse = {
      statusCode: result.code,
      message: result.message,
      timestamp: new Date().toISOString(),
    };
    return responseError;
  }
}
