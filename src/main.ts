import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { tmpdir } from 'os';
import * as formdata from 'express-form-data'
import { json } from 'body-parser';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra'
const os = require('os');
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
  });

  const options = {uploadDir:os.tmpdir(),autoclean:true}

app.useGlobalPipes(new ValidationPipe({
  whitelist:true,
  transform:true,
  transformOptions:{enableImplicitConversion:true}

}));

app.use(

 formdata.parse(options),
formdata.format(),
json({type:['*/*']}),
  
)
admin.initializeApp({
  credential: admin.credential.cert(require('/home/aiimtech05/projects/officework-multiauth/officeworkV1/officework/dealer-2f344-firebase-adminsdk-jchlo-ab0fcd8a52.json')),
})



await app.listen(3005);

}
bootstrap();
