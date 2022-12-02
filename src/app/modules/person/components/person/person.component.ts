import { PersonService } from './../../../shared/services/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit{
  constructor(private personaService: PersonService) {}

  ngOnInit(): void {

    this.getPersons();
  }

  getPersons() {
    this.personaService.getPersons().subscribe((data) => {
      console.log('Respuesta Persona:', data);
    });
  }
}
