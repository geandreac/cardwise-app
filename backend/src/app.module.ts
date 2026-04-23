import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity'; // Assumindo que você tem uma entidade User

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O host é localhost porque você está acessando de fora do Docker
      port: 5432,
      username: 'cardwiseuser',
      password: 'cardwisepassword',
      database: 'cardwisedb',
      entities: [User], // Certifique-se de que suas entidades estão listadas aqui
      synchronize: true, // Cuidado com isso em produção, mas é bom para desenvolvimento
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
