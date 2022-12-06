import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from './../../../shared/services/person.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css'],
})
export class NewPersonComponent implements OnInit {
  public personForm: FormGroup;
  estadoForm: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private dialogRef: MatDialogRef<NewPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.estadoForm = 'Agregar';
    this.personForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      estatura: ['', Validators.required],
      peso: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      esp: ['', Validators.required],
      salario: ['', Validators.required],
    });

    if (data != null) {
      this.updateForm(data);
      this.estadoForm = 'Actualizar';
    }
  }
  ngOnInit(): void {}
  onSave() {
    let data = {
      nombre: this.personForm.get('nombre')?.value,
      apellido: this.personForm.get('apellido')?.value,
      identificacion: this.personForm.get('identificacion')?.value,
      estatura: this.personForm.get('estatura')?.value,
      peso: this.personForm.get('peso')?.value,
      fechanacimiento: this.personForm.get('fechanacimiento')?.value,
      esp: this.personForm.get('esp')?.value,
      salario: this.personForm.get('salario')?.value,
    };
    if (data != null) {
      //actualizo el registro
      this.personService
        .updatePersons(data, this.data.idpersona)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        });
    } else {
      //crear un registro
      this.personService.savePersons(data).subscribe((data) => {
        console.log(data);
        this.dialogRef.close(1);
      });
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.personForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      identificacion: [data.identificacion, Validators.required],
      estatura: [data.estatura, Validators.required],
      peso: [data.peso, Validators.required],
      fechanacimiento: [data.fechanacimiento, Validators.required],
      esp: [data.eps, Validators.required],
      salario: [data.salario, Validators.required],
    });
  }
}
