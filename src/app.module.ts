// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gabrielogabriel10:roupa123@cluster0.tytdwc2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // substitua pela URL correta do MongoDB
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
