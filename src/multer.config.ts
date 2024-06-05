// multer.config.ts
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads/images/', // directorio donde se guardarán los archivos subidos
    filename: (req : any, file : any, callback : any) => {
      // Define el nombre del archivo
      const filename = `${Date.now()}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
