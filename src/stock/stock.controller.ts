import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { HTTPResponse } from 'src/common/http/response';
import { Result } from 'src/common/result/result';
import { StockService } from './stock.service';

@UseInterceptors(CacheInterceptor)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('price')
  async getStockPrice(
    @Query('symbols') symbol,
    @Query('companyName') companyName,
  ) {
    let symbols = [symbol];

    if (!symbol) {
      const searchByCompanyNameResult = await this.stockService.searchStock(
        companyName,
      );
      if (searchByCompanyNameResult instanceof Result) {
        const symbolList = searchByCompanyNameResult.data.quotes?.map(
          (item) => {
            return item?.symbol;
          },
        );
        symbols = symbolList.filter((item) => item);
      }
    }
    const result = await this.stockService.getStockPrice(symbols);
    if (result instanceof Result) {
      const response: HTTPResponse = {
        statusCode: HttpStatus.OK,
        message: 'Get stock price successfully.',
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

  @Get('search')
  async searchStockList(@Query('query') query) {
    const result = await this.stockService.searchStock(query);
    if (result instanceof Result) {
      const response: HTTPResponse = {
        statusCode: HttpStatus.OK,
        message: 'Search stock list successfully.',
        timestamp: new Date().toISOString(),
        data: result.data,
      };
      return response;
    }
    throw new HttpException(result.message, result.code);
  }
}
