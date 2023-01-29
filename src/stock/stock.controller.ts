import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTPResponse } from 'src/common/http/response';
import { Result } from 'src/common/result/result';
import { StockService } from './stock.service';

@UseInterceptors(CacheInterceptor)
@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiQuery({
    name: 'symbols',
    required: false,
    type: 'string',
    description: 'a symbol to get current price in usd.',
  })
  @ApiQuery({
    name: 'companyName',
    required: false,
    type: 'string',
    description: 'get current price by seach company name.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get stock price successfully.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Get stock price successfully.',
        timestamp: '2023-01-29T05:05:46.505Z',
        data: [
          {
            currentPrice: 145.93,
            symbol: 'AAPL',
          },
        ],
      },
    },
  })
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

  @ApiQuery({
    name: 'query',
    required: false,
    type: 'string',
    description: 'query string for search.',
  })
  @ApiResponse({
    status: 200,
    description: 'Search stock list successfully.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Search stock list successfully.',
        timestamp: '2023-01-29T05:06:30.133Z',
        data: {
          explains: [],
          count: 11,
          quotes: [
            {
              exchange: 'NMS',
              shortname: 'Apple Inc.',
              quoteType: 'EQUITY',
              symbol: 'AAPL',
              index: 'quotes',
              score: 373859,
              typeDisp: 'Equity',
              longname: 'Apple Inc.',
              exchDisp: 'NASDAQ',
              sector: 'Technology',
              industry: 'Consumer Electronics',
              dispSecIndFlag: true,
              isYahooFinance: true,
            },
            {
              exchange: 'NYQ',
              shortname: 'Apple Hospitality REIT, Inc.',
              quoteType: 'EQUITY',
              symbol: 'APLE',
              index: 'quotes',
              score: 21748,
              typeDisp: 'Equity',
              longname: 'Apple Hospitality REIT, Inc.',
              exchDisp: 'NYSE',
              sector: 'Real Estate',
              industry: 'REIT—Hotel & Motel',
              isYahooFinance: true,
            },
            {
              exchange: 'NEO',
              shortname: 'APPLE CDR (CAD HEDGED)',
              quoteType: 'EQUITY',
              symbol: 'AAPL.NE',
              index: 'quotes',
              score: 20534,
              typeDisp: 'Equity',
              longname: 'Apple Inc.',
              exchDisp: 'NEO',
              sector: 'Technology',
              industry: 'Consumer Electronics',
              isYahooFinance: true,
            },
            {
              exchange: 'GER',
              shortname: 'APPLE INC',
              quoteType: 'EQUITY',
              symbol: 'APC.DE',
              index: 'quotes',
              score: 20108,
              typeDisp: 'Equity',
              longname: 'Apple Inc.',
              exchDisp: 'XETRA',
              sector: 'Technology',
              industry: 'Consumer Electronics',
              isYahooFinance: true,
            },
            {
              exchange: 'PNK',
              shortname: 'APPLE RUSH COMPANY INC',
              quoteType: 'EQUITY',
              symbol: 'APRU',
              index: 'quotes',
              score: 20088,
              typeDisp: 'Equity',
              longname: 'Apple Rush Company, Inc.',
              exchDisp: 'OTC Markets',
              sector: 'Consumer Defensive',
              industry: 'Beverages—Non-Alcoholic',
              isYahooFinance: true,
            },
            {
              index: 'd8c1b54896db4e148d5bff7bdd4778d0',
              name: 'Apple Tree Partners',
              permalink: 'apple-tree-partners',
              isYahooFinance: false,
            },
            {
              index: '902d61b27b7039fda61fc3a9dc44fe1a',
              name: 'Applecart',
              permalink: 'project-applecart',
              isYahooFinance: false,
            },
          ],
          news: [
            {
              uuid: '5a7c7c40-d411-32ea-8ac5-58c115fece40',
              title:
                "Why This May Be A 'Life Changing' Market Rally; Apple, Fed Meeting Loom As Tesla Run Hits 75%",
              publisher: "Investor's Business Daily",
              link: 'https://finance.yahoo.com/m/5a7c7c40-d411-32ea-8ac5-58c115fece40/why-this-may-be-a-%27life.html',
              providerPublishTime: '2023-01-28T21:46:36.000Z',
              type: 'STORY',
              thumbnail: {
                resolutions: [
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/ba6o5RYZCDuCe2zA7RimNg--~B/aD01NzI7dz0xMDEyO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/ibd.com/cc5c97ccaa42b69e95b7b7a633ba673c',
                    width: 1012,
                    height: 572,
                    tag: 'original',
                  },
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/OkfP.2TagBqMfvD4cXPoqg--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/ibd.com/cc5c97ccaa42b69e95b7b7a633ba673c',
                    width: 140,
                    height: 140,
                    tag: '140x140',
                  },
                ],
              },
              relatedTickers: [
                'TSLA',
                '^GSPC',
                'COMP',
                '^DJI',
                '^RUT',
                'ETSY',
                'AAPL',
                'AMZN',
              ],
            },
            {
              uuid: '543b5153-6709-428c-9a05-330d6d59322e',
              title:
                'Apple could limit WiFi 6E availability to iPhone 15 Pro models',
              publisher: 'Engadget',
              link: 'https://finance.yahoo.com/m/543b5153-6709-428c-9a05-330d6d59322e/apple-could-limit-wifi-6e.html',
              providerPublishTime: '2023-01-28T19:36:40.000Z',
              type: 'STORY',
              thumbnail: {
                resolutions: [
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/NVDuEHxiATI3A1pxIA_AgA--~B/aD0xMzMzO3c9MjAwMDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2022-09/6403bdc0-33d9-11ed-b6fd-41aceb29f6e3',
                    width: 2000,
                    height: 1333,
                    tag: 'original',
                  },
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/BF3egWLpEefkI03ajLziXQ--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://s.yimg.com/os/creatr-uploaded-images/2022-09/6403bdc0-33d9-11ed-b6fd-41aceb29f6e3',
                    width: 140,
                    height: 140,
                    tag: '140x140',
                  },
                ],
              },
            },
            {
              uuid: 'b794c14f-88eb-4a40-9c07-108b1b9b9a6a',
              title:
                'Apple will reportedly let anyone make apps for its mixed reality headset using Siri',
              publisher: 'Engadget',
              link: 'https://finance.yahoo.com/m/b794c14f-88eb-4a40-9c07-108b1b9b9a6a/apple-will-reportedly-let.html',
              providerPublishTime: '2023-01-27T17:14:37.000Z',
              type: 'STORY',
              thumbnail: {
                resolutions: [
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/SkEc1ToP9pWvaYLvfx8f0A--~B/aD0zMzM1O3c9NTAwMDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2021-03/f6458a50-7fdb-11eb-bffd-7dfe1212161c',
                    width: 5000,
                    height: 3335,
                    tag: 'original',
                  },
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/ELZCtoAFt4uJuz8hJu6.6Q--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://s.yimg.com/os/creatr-uploaded-images/2021-03/f6458a50-7fdb-11eb-bffd-7dfe1212161c',
                    width: 140,
                    height: 140,
                    tag: '140x140',
                  },
                ],
              },
            },
            {
              uuid: '35cf67f1-a69d-344e-ab98-86ca452e83b5',
              title: 'Big Banks Try to Take On Apple Wallet and PayPal',
              publisher: 'Motley Fool',
              link: 'https://finance.yahoo.com/m/35cf67f1-a69d-344e-ab98-86ca452e83b5/big-banks-try-to-take-on.html',
              providerPublishTime: '2023-01-28T12:00:00.000Z',
              type: 'STORY',
              thumbnail: {
                resolutions: [
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/ADDzaOQxNo9Hh8wEZnZLgw--~B/aD0xMDgwO3c9MTkyMDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/motleyfool.com/4b16a7cd2a10202e9641652f1fb5896e',
                    width: 1920,
                    height: 1080,
                    tag: 'original',
                  },
                  {
                    url: 'https://s.yimg.com/uu/api/res/1.2/kNyRdA4CfvjTQNAOQlDT.w--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/motleyfool.com/4b16a7cd2a10202e9641652f1fb5896e',
                    width: 140,
                    height: 140,
                    tag: '140x140',
                  },
                ],
              },
              relatedTickers: ['PYPL', 'SPOT', 'FNKO', 'DIS'],
            },
          ],
          nav: [],
          lists: [],
          researchReports: [],
          screenerFieldResults: [],
          totalTime: 133,
          timeTakenForQuotes: 427,
          timeTakenForNews: 900,
          timeTakenForAlgowatchlist: 400,
          timeTakenForPredefinedScreener: 400,
          timeTakenForCrunchbase: 400,
          timeTakenForNav: 400,
          timeTakenForResearchReports: 0,
          timeTakenForScreenerField: 0,
          timeTakenForCulturalAssets: 0,
        },
      },
    },
  })
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
