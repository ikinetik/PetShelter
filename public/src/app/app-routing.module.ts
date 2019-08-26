import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { ShowPetComponent } from './show-pet/show-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';

const routes: Routes = [
  { path: 'pets',component: DashboardComponent },
  { path: 'pets/new',component: NewPetComponent },
  { path: 'pets/:id',component: ShowPetComponent},
  { path: 'pets/:id/edit',component: EditPetComponent},
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
  { path: '**', component: DashboardComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
