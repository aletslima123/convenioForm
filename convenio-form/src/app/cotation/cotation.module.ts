import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CotationRoutingModule } from './cotation-routing.module';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [FormComponent, SuccessComponent],
  imports: [CommonModule, CotationRoutingModule, SharedModule],
})
export class CotationModule {}
