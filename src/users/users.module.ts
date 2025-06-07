import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService], // exporta para uso no AuthModule
})
export class UsersModule {}
