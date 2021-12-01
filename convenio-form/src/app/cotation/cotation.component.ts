import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotation',
  templateUrl: './cotation.component.html',
  styleUrls: ['./cotation.component.scss'],
})
export class CotationComponent implements OnInit {
  totalSteps = 3;
  currentStep = 1;

  constructor() {}

  ngOnInit(): void {}
}
