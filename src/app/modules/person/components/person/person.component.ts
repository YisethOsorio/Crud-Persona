import { ConfirmComponent } from './../../../shared/components/confirm/confirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from './../../../shared/services/person.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPersonComponent } from '../new-person/new-person.component';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  constructor(
    private personaService: PersonService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPersons();
  }


  displayedColumns: String[] = [
    'idpersona',
    'nombre',
    'apellido',
    'identificacion',
    'estatura',
    'peso',
    'fechanacimiento',
    'eps',
    'salario',
    'actions',
  ];
  dataSource = new MatTableDataSource<PersonElement>();

  getPersons() {
    this.personaService.getPersons().subscribe(
      (data) => {
        console.log('Respuesta Persona:', data);
        this.processPersonaResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processPersonaResponse(resp: any) {
    const dataPerson: PersonElement[] = [];
    if (resp.metadata[0].code == '00') {
      let listPerson = resp.personaResponse.persona;

      listPerson.forEach((element: PersonElement) => {
        dataPerson.push(element);
      });
      this.dataSource = new MatTableDataSource<PersonElement>(dataPerson);
    }
  }

  openPersonDialog(): void {
    const dialogRef = this.dialog.open(NewPersonComponent, {
      width: '400px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.openSnackBar("Persona Agregada" , "Exitosa");
        this.getPersons();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar la persona", "Error");
      }
    });
  }
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

  edit(idpersona: number,  nombre: string, apellido: string , identificacion:string,
       estatura: number,peso: number, fechanacimiento: Date, eps: string, salario: bigint){
        const dialogRef = this.dialog.open(NewPersonComponent, {
          data: {idpersona: idpersona, nombre: nombre, apellido: apellido, identificacion: identificacion,
          estatura:estatura, peso: peso, fechanacimiento: fechanacimiento, eps: eps, salario: salario },
          width: '400px',
          height: '600px',
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result == 1) {
            this.openSnackBar("Persona Actualizada" , "Exitosa");
            this.getPersons();
          } else if (result == 2) {
            this.openSnackBar("Se produjo un error al actualizar la persona", "Error");
          }
        });
  }
  delete(idpersona: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {idpersona: idpersona },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.openSnackBar("Persona Eliminada" , "Exitosamente");
        this.getPersons();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar la persona", "Error");
      }
    });
  }
}



export interface PersonElement {
  nombre: string;
  idpersona: number;
  apellido: string;
  identificacion: string;
  estatura: number;
  peso: number;
  fechanacimiento: Date;
  eps: string;
  salario: BigInt;
}
