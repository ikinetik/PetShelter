import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  pet_to_edit: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("Id of the pet to edit is:", params['id']);
      this.getPet(params['id']);
    });
    //this.pet_to_edit = {name:"", type: "", description: "", skills: []};
  }

  //Methods:

  getPet(id){
    console.log('Getting a pet to edit now....');
    let observable = this._httpService.getPetFromService(id);
    observable.subscribe(data => {
      this.pet_to_edit = data;
      console.log('Pet to edit:', this.pet_to_edit);
      
    });


  }

updatePet(){
  console.log('Updating a pet...');
  let observable = this._httpService.updatePetFromService(this.pet_to_edit); //already contains ID!
    observable.subscribe(data => {
      console.log('Successfully updated a pet!');
      this._router.navigate(['/pets']);
      
    });
}




}
