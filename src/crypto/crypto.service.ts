import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessage, Result } from 'src/common/result/result';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class CryptoService {
  constructor(private readonly httpService: HttpService) {}
  async getCryptoPrice(symbol: string): Promise<ErrorMessage | Result<any>> {
    try {
      const result = await this.httpService.request({
        headers: {
          accept: 'application/json',
          'Accept-Encoding': 'gzip,deflate,compress',
        },
        method: 'get',
        url: 'https://api.coingecko.com/api/v3/search',
        params: { query: symbol },
      });
      const listResult = await (await lastValueFrom(result)).data?.coins;

      if (!listResult) {
        return new ErrorMessage(HttpStatus.BAD_REQUEST, 'symbol not found');
      }

      const currentCoin = listResult.filter((item) => item.symbol == symbol);

      const priceResult = await this.httpService.request({
        headers: {
          accept: 'application/json',
          'Accept-Encoding': 'gzip,deflate,compress',
        },
        method: 'get',
        url: 'https://api.coingecko.com/api/v3/coins/' + currentCoin[0]?.id,
        params: { query: symbol },
      });
      const priceResultData = await (await lastValueFrom(priceResult)).data;

      return new Result({
        symbol: symbol,
        currentPrice: priceResultData?.market_data?.current_price.usd,
      });
    } catch (error) {
      return new ErrorMessage(
        HttpStatus.BAD_REQUEST,
        error?.response?.data?.error,
      );
    }
  }
}
