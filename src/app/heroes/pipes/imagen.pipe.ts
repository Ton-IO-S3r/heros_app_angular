import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    const assets_rute = "assets/img/heroes/";
    return `${assets_rute}${heroe.id}.jpg`;
  }

}