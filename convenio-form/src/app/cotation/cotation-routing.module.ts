import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CotationComponent } from './cotation.component';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: '',
    component: CotationComponent,
    children: [
      { path: 'form', component: FormComponent },
      { path: 'success', component: SuccessComponent },
    ],
  },
];

@NgModule({
  imports: [],
  exports: [],
})
export class CotationRoutingModule {}
