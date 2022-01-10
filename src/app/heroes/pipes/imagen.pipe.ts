import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/img/no-image.png'
    } else if (heroe.alt_img){
      return heroe.alt_img
    } else{
      const assets_rute = "assets/img/heroes/";
      return `${assets_rute}${heroe.id}.jpg`;
    }
  }

}
