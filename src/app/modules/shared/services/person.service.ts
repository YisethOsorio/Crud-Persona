import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }


  /**get all persons */
  getPersons(){
    const endpoint = `${base_url}/persons`;
    return this.http.get(endpoint);
  }

  /**save the persons */
  savePersons(body: any){
    const endpoint = `${base_url}/persons`;
    return this.http.post(endpoint, body);
  }
}
