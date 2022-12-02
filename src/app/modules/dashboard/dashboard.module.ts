import { PersonModule } from './../person/person.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonModule,
  ]
})
export class DashboardModule { }
