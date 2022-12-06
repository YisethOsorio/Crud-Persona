import { PersonService } from './../../services/person.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personService: PersonService
  ) {}

  ngOnInit(): void {}

  delete() {
    if (this.data != null) {
      this.personService
        .detelePersons(this.data.idpersona)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        });
    } else {
      this.dialogRef.close(2);
    }
  }

  onNoClick() {
    this.dialogRef.close(3);
  }
}
