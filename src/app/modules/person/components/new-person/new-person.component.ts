import { MatDialogRef } from '@angular/material/dialog';
import { PersonService } from './../../../shared/services/person.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit{

  public personForm: FormGroup;

  constructor(private fb: FormBuilder, private personService : PersonService,
    private dialogRef: MatDialogRef<NewPersonComponent>){
    this.personForm = this.fb.group({
      nombre:  ['', Validators.required],
      apellido:  ['', Validators.required],
      identificacion:  ['', Validators.required],
      estatura:  ['', Validators.required],
      peso:  ['', Validators.required],
      fechanacimiento:  ['', Validators.required],   
      esp:  ['', Validators.required],
      salario:  ['', Validators.required],
      
    });
  }
ngOnInit(): void {
    
}
onSave(){
  let data = {
    nombre: this.personForm.get('nombre')?.value,
    apellido: this.personForm.get('apellido')?.value,
    identificacion: this.personForm.get('identificacion')?.value,
    estatura: this.personForm.get('estatura')?.value,
    peso: this.personForm.get('peso')?.value,
    fechanacimiento: this.personForm.get('fechanacimiento')?.value,
    esp: this.personForm.get('esp')?.value,
    salario: this.personForm.get('salario')?.value,
  }
  this.personService.savePersons(data).subscribe(data =>{
    console.log(data);
    this.dialogRef.close(1);
  });

}

onCancel(){

}
}
