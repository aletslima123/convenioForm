import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';
import { CotationRoutingModule } from './cotation-routing.module';

@NgModule({
  declarations: [FormComponent, SuccessComponent],
  imports: [CommonModule, CotationRoutingModule],
})
export class CotationModule {}
