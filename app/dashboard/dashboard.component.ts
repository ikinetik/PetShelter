import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pets;
  constructor( 
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) 
  { 
    this.pets = [];
  }

  ngOnInit() {
    this.getAllPets();
  
  }

  getAllPets(){
    let observable = this._httpService.getAllPetsFromService();
    observable.subscribe(data => {
      this.pets = data;
      
    });
  }

} //END CLASS

