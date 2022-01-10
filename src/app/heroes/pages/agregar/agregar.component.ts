import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: "",
  }
  constructor( private heroesService: HeroesService, 
               private activatedRoute: ActivatedRoute, 
               private router: Router,
               private _snackBar: MatSnackBar,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHero(id))
      )
      .subscribe( heroe => this.heroe = heroe)
  }
  
  saveHero = () => {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroesService.editHero(this.heroe)
          .subscribe( resp => this.mostrarSnackBar('Heroe actualizado exitosamente'))

    } else {
      // Crear
      this.heroesService.addHero(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackBar('Se agregó correctamente')
        });
      }
    }
    
    borrarHeroe = () => {
       const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        width: '250px'
      })
      confirmDialog.afterClosed()
          .subscribe( resp => {
            this.heroesService.deleteHero(this.heroe.id!)
              .subscribe( resp => {
                this.router.navigate(['/heroes']);
                this.mostrarSnackBar(`Se eliminó a ${this.heroe.superhero}`);
              
              });
          });


  }

  mostrarSnackBar = ( mensaje: string) => {
    this._snackBar.open(mensaje, 'Ok!', {
      duration:2500
    })
  }
}
