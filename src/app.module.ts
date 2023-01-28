import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CryptoModule } from './crypto/crypto.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 10,
      max: 100,
      isGlobal: true,
    }),
    CryptoModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
