import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
//Class data types:
newPet: any;
errorMsg: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) {this.errorMsg = []; }

  ngOnInit() {
    this.newPet = {name:"", type: "", description: "", skills: []};
    
  }

  createNewPet()
  {
    console.log('A form was submitted! Going to the service to retrieve data...');
    console.log('New pet: ' + this.newPet);
    let observable = this._httpService.addPetFromService(this.newPet);
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this._router.navigate(['/pets']); //if successful

    }, (err)=> { //else display errors
      this.errorMsg = err.error;
      console.log('errors with form');
    });
    // Reset this.newTask to a new, clean object.
    //this.newPet = {name:"", type: "", description: "", skills: []};
  } 

} //END CLASS
