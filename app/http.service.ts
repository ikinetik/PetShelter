import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  //Methods:
  addPetFromService(newPet){
    return this._http.post('/addPet', newPet) //Angular will take in the object for us in this post request and handle making it available for our backend to store in our database behind the scenes
  }

  getAllPetsFromService (){
    return this._http.get('/getPets');
  }

  getPetFromService(id){
    return this._http.get('/getPet/' + id);
  }

  updatePetFromService(editPet){
    return this._http.put('/updatePet/' +editPet._id , editPet); //Take the id from the 'editTask' OBJECT we passed in!

  }

  deletePetFromService(id){
    return this._http.get('/deletePet/' + id);
  }
}
