import { Injectable, HttpStatus } from '@nestjs/common';
import { ErrorMessage, Result } from 'src/common/result/result';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class StockService {
  async getStockPrice(symbol: string[]): Promise<ErrorMessage | Result<any>> {
    try {
      const result = await yahooFinance.quote(symbol);
      if (!result) {
        return new ErrorMessage(HttpStatus.BAD_REQUEST, 'symbol not found');
      }

      const quoteResult = result.map((data) => {
        return {
          currentPrice: data?.regularMarketPrice || null,
          symbol: data?.symbol,
        };
      });
      return new Result(quoteResult);
    } catch (error) {
      return new ErrorMessage(HttpStatus.BAD_REQUEST, error?.message);
    }
  }

  async searchStock(query: string): Promise<ErrorMessage | Result<any>> {
    try {
      const result = await yahooFinance.search(query);
      return new Result(result);
    } catch (error) {
      return new ErrorMessage(HttpStatus.BAD_REQUEST, error?.message);
    }
  }
}
