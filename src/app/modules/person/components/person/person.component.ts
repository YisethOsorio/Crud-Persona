import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from './../../../shared/services/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  constructor(private personaService: PersonService) {}

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
      }, (error: any) => {
        console.log("error: ", error);
      });
    }

  processPersonaResponse(resp: any) {
    const dataPerson: PersonElement[] = [];
    if( resp.metadata[0].code == "00") {
      let listPerson = resp.personaResponse.persona;

      listPerson.forEach((element: PersonElement) => {
        dataPerson.push(element);
      });
      this.dataSource = new MatTableDataSource<PersonElement>(dataPerson);  
    }
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
