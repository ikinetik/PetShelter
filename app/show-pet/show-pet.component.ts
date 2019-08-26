import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show-pet',
  templateUrl: './show-pet.component.html',
  styleUrls: ['./show-pet.component.css']
})
export class ShowPetComponent implements OnInit {
  pet_to_show: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("Id of the pet is:", params['id']);
      this.showPet(params['id']);
    });
  }

  //Methods:
  showPet(id){
    console.log('Getting a pet to show now....');
    let observable = this._httpService.getPetFromService(id);
    observable.subscribe(data => {
      this.pet_to_show = data;
      console.log('Pet to show:', this.pet_to_show);
      
    });

  }

deletePet(id){
  console.log('Deleting a pet....', id);
  let observable = this._httpService.deletePetFromService(id);
  observable.subscribe(data => {
    console.log("Deleted the pet!", data)
    this._router.navigate(['/pets']);
  });

  
}

} //END CLASS
