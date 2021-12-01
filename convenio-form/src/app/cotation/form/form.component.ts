import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ForWho, You } from '../cotation.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  cotationForm: FormGroup;
  forWho: ForWho;
  you: You;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.cotationForm = this.fb.group({
      forWho: ['', Validators.required],
      hasHealthInsurance: [],
      name: ['', Validators.required],
      ddd: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      canIcallYou: [false],
      canIemailYou: [false],
      canITextYou: [false],
      cep: [],
      nursery: [],
      room: [],
      cnpj: [],
      familyMembers: [],
    });

    this.cotationForm
      .get('forWho')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((forWho: ForWho) => {
        console.log(forWho);
        this.forWho = forWho;
        this.you = You[forWho];
      });
  }

  public onSubmit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
