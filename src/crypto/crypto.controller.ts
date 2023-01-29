import {
  Controller,
  Get,
  Query,
  HttpStatus,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTPResponse } from 'src/common/http/response';
import { Result } from 'src/common/result/result';
import { CryptoService } from './crypto.service';

@UseInterceptors(CacheInterceptor)
@ApiTags('crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @ApiQuery({
    name: 'symbols',
    required: false,
    type: 'string',
    description: 'a symbol to get current price in usd.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get crypto price successfully.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Get crypto price successfully.',
        timestamp: '2023-01-28T14:15:00.008Z',
        data: {
          symbol: 'ETH',
          currentPrice: 1573.56,
        },
      },
    },
  })
  @Get('price')
  async getCryptoPrice(@Query('symbols') symbol) {
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

  @ApiQuery({
    name: 'query',
    required: false,
    type: 'string',
    description: 'query string for search crypto list.',
  })
  @ApiResponse({
    status: 200,
    description: 'Search crypto list successfully.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Search crypto list successfully.',
        timestamp: '2023-01-29T05:08:12.767Z',
        data: [
          {
            id: 'solana',
            name: 'Solana',
            api_symbol: 'solana',
            symbol: 'SOL',
            market_cap_rank: 12,
            thumb:
              'https://assets.coingecko.com/coins/images/4128/thumb/solana.png',
            large:
              'https://assets.coingecko.com/coins/images/4128/large/solana.png',
          },
          {
            id: 'msol',
            name: 'Marinade staked SOL',
            api_symbol: 'msol',
            symbol: 'MSOL',
            market_cap_rank: 187,
            thumb:
              'https://assets.coingecko.com/coins/images/17752/thumb/mSOL.png',
            large:
              'https://assets.coingecko.com/coins/images/17752/large/mSOL.png',
          },
          {
            id: 'lido-staked-sol',
            name: 'Lido Staked SOL',
            api_symbol: 'lido-staked-sol',
            symbol: 'STSOL',
            market_cap_rank: 269,
            thumb:
              'https://assets.coingecko.com/coins/images/18369/thumb/logo_-_2021-09-15T100934.765.png',
            large:
              'https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png',
          },
          {
            id: 'solo-coin',
            name: 'Sologenic',
            api_symbol: 'solo-coin',
            symbol: 'SOLO',
            market_cap_rank: 372,
            thumb:
              'https://assets.coingecko.com/coins/images/10771/thumb/solo.png',
            large:
              'https://assets.coingecko.com/coins/images/10771/large/solo.png',
          },
          {
            id: 'solve-care',
            name: 'SOLVE',
            api_symbol: 'solve-care',
            symbol: 'SOLVE',
            market_cap_rank: 718,
            thumb:
              'https://assets.coingecko.com/coins/images/1768/thumb/Solve.Token_logo_200_200_wiyhout_BG.png',
            large:
              'https://assets.coingecko.com/coins/images/1768/large/Solve.Token_logo_200_200_wiyhout_BG.png',
          },
          {
            id: 'green-satoshi-token',
            name: 'STEPN Green Satoshi Token on Solana',
            api_symbol: 'green-satoshi-token',
            symbol: 'GST-SOL',
            market_cap_rank: 788,
            thumb:
              'https://assets.coingecko.com/coins/images/21841/thumb/gst.png',
            large:
              'https://assets.coingecko.com/coins/images/21841/large/gst.png',
          },
          {
            id: 'solend',
            name: 'Solend',
            api_symbol: 'solend',
            symbol: 'SLND',
            market_cap_rank: 888,
            thumb:
              'https://assets.coingecko.com/coins/images/19573/thumb/i6AMOwun_400x400.jpg',
            large:
              'https://assets.coingecko.com/coins/images/19573/large/i6AMOwun_400x400.jpg',
          },
          {
            id: 'socean-staked-sol',
            name: 'Socean Staked Sol',
            api_symbol: 'socean-staked-sol',
            symbol: 'SCNSOL',
            market_cap_rank: 1133,
            thumb:
              'https://assets.coingecko.com/coins/images/18468/thumb/biOTzfxE_400x400.png',
            large:
              'https://assets.coingecko.com/coins/images/18468/large/biOTzfxE_400x400.png',
          },
          {
            id: 'solcial',
            name: 'Solcial',
            api_symbol: 'solcial',
            symbol: 'SLCL',
            market_cap_rank: 1186,
            thumb:
              'https://assets.coingecko.com/coins/images/24583/thumb/1_N9szP0_400x400.jpg',
            large:
              'https://assets.coingecko.com/coins/images/24583/large/1_N9szP0_400x400.jpg',
          },
          {
            id: 'solanium',
            name: 'Solanium',
            api_symbol: 'solanium',
            symbol: 'SLIM',
            market_cap_rank: 1214,
            thumb:
              'https://assets.coingecko.com/coins/images/15816/thumb/logo_cg.png',
            large:
              'https://assets.coingecko.com/coins/images/15816/large/logo_cg.png',
          },
          {
            id: 'trisolaris',
            name: 'Trisolaris',
            api_symbol: 'trisolaris',
            symbol: 'TRI',
            market_cap_rank: 2090,
            thumb:
              'https://assets.coingecko.com/coins/images/20607/thumb/logo_-_2021-11-19T104946.772.png',
            large:
              'https://assets.coingecko.com/coins/images/20607/large/logo_-_2021-11-19T104946.772.png',
          },
          {
            id: 'solrise-finance',
            name: 'Solrise Finance',
            api_symbol: 'solrise-finance',
            symbol: 'SLRS',
            market_cap_rank: 2097,
            thumb:
              'https://assets.coingecko.com/coins/images/15762/thumb/9989.png',
            large:
              'https://assets.coingecko.com/coins/images/15762/large/9989.png',
          },
          {
            id: 'solchicks-token',
            name: 'SolChicks',
            api_symbol: 'solchicks-token',
            symbol: 'CHICKS',
            market_cap_rank: 2242,
            thumb:
              'https://assets.coingecko.com/coins/images/20978/thumb/chicks.png',
            large:
              'https://assets.coingecko.com/coins/images/20978/large/chicks.png',
          },
          {
            id: 'solace',
            name: 'SOLACE',
            api_symbol: 'solace',
            symbol: 'SOLACE',
            market_cap_rank: 2295,
            thumb:
              'https://assets.coingecko.com/coins/images/21277/thumb/IMG_6599.png',
            large:
              'https://assets.coingecko.com/coins/images/21277/large/IMG_6599.png',
          },
          {
            id: 'solarbeam',
            name: 'Solarbeam',
            api_symbol: 'solarbeam',
            symbol: 'SOLAR',
            market_cap_rank: 2388,
            thumb:
              'https://assets.coingecko.com/coins/images/18260/thumb/solarbeamlogo.png',
            large:
              'https://assets.coingecko.com/coins/images/18260/large/solarbeamlogo.png',
          },
          {
            id: 'solape-token',
            name: 'SOLAPE',
            api_symbol: 'solape-token',
            symbol: 'SOLAPE',
            market_cap_rank: 2483,
            thumb:
              'https://assets.coingecko.com/coins/images/16930/thumb/128px-coin.png',
            large:
              'https://assets.coingecko.com/coins/images/16930/large/128px-coin.png',
          },
          {
            id: 'soldex',
            name: 'Soldex',
            api_symbol: 'soldex',
            symbol: 'SOLX',
            market_cap_rank: 2518,
            thumb:
              'https://assets.coingecko.com/coins/images/21362/thumb/output-onlinepngtools_%2811%29.png',
            large:
              'https://assets.coingecko.com/coins/images/21362/large/output-onlinepngtools_%2811%29.png',
          },
          {
            id: 'apollon-limassol',
            name: 'Apollon Limassol Fan Token',
            api_symbol: 'apollon-limassol',
            symbol: 'APL',
            market_cap_rank: 2545,
            thumb:
              'https://assets.coingecko.com/coins/images/13054/thumb/Apollon-10_%28NEW%29.jpg',
            large:
              'https://assets.coingecko.com/coins/images/13054/large/Apollon-10_%28NEW%29.jpg',
          },
          {
            id: 'soldoge',
            name: 'SolDoge',
            api_symbol: 'soldoge',
            symbol: 'SDOGE',
            market_cap_rank: 2622,
            thumb:
              'https://assets.coingecko.com/coins/images/19746/thumb/2L4aX1r.png',
            large:
              'https://assets.coingecko.com/coins/images/19746/large/2L4aX1r.png',
          },
          {
            id: 'solanax',
            name: 'Solanax',
            api_symbol: 'solanax',
            symbol: 'SOLD',
            market_cap_rank: 2709,
            thumb:
              'https://assets.coingecko.com/coins/images/17634/thumb/sold.png',
            large:
              'https://assets.coingecko.com/coins/images/17634/large/sold.png',
          },
          {
            id: 'solvent',
            name: 'Solvent',
            api_symbol: 'solvent',
            symbol: 'SVT',
            market_cap_rank: 2877,
            thumb:
              'https://assets.coingecko.com/coins/images/22387/thumb/svt.png',
            large:
              'https://assets.coingecko.com/coins/images/22387/large/svt.png',
          },
          {
            id: 'solidex',
            name: 'Solidex',
            api_symbol: 'solidex',
            symbol: 'SEX',
            market_cap_rank: 3040,
            thumb:
              'https://assets.coingecko.com/coins/images/23855/thumb/photo_2022-02-23_09.01.21.jpeg',
            large:
              'https://assets.coingecko.com/coins/images/23855/large/photo_2022-02-23_09.01.21.jpeg',
          },
          {
            id: 'parasol-finance',
            name: 'Parasol Finance',
            api_symbol: 'parasol-finance',
            symbol: 'PSOL',
            market_cap_rank: 3120,
            thumb:
              'https://assets.coingecko.com/coins/images/21551/thumb/icon.png',
            large:
              'https://assets.coingecko.com/coins/images/21551/large/icon.png',
          },
          {
            id: 'solberg',
            name: 'Solberg',
            api_symbol: 'solberg',
            symbol: 'SLB',
            market_cap_rank: 3165,
            thumb:
              'https://assets.coingecko.com/coins/images/18918/thumb/logo_%2822%29.png',
            large:
              'https://assets.coingecko.com/coins/images/18918/large/logo_%2822%29.png',
          },
          {
            id: 'x-consoles',
            name: 'X-Consoles',
            api_symbol: 'x-consoles',
            symbol: 'GAME',
            market_cap_rank: 3274,
            thumb:
              'https://assets.coingecko.com/coins/images/21616/thumb/photo_2021-12-25_01-03-14.jpg',
            large:
              'https://assets.coingecko.com/coins/images/21616/large/photo_2021-12-25_01-03-14.jpg',
          },
        ],
      },
    },
  })
  @Get('search')
  async getCryptoList(@Query('query') symbol) {
    const result = await this.cryptoService.getCryptoList(symbol);
    if (result instanceof Result) {
      const response: HTTPResponse = {
        statusCode: HttpStatus.OK,
        message: 'Search crypto list successfully.',
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
