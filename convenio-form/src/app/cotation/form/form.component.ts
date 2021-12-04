import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Dependent,
  ForWho,
  IdOptions,
  NameOptions,
  You,
} from '../cotation.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  cotationForm: FormGroup;
  forWho: ForWho;
  you: You;
  nameOption: NameOptions;
  idOption: IdOptions;
  destroy$: Subject<boolean> = new Subject<boolean>();
  hasHealthInsurance: boolean = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.cotationForm = this.fb.group({
      forWho: ['', Validators.required],
      hasHealthInsurance: [''],
      currentHealthInsuranceData: [],
      id: [], // CPF ou CNPJ validation
      name: ['', Validators.required], // or companyName
      birthDay: ['', Validators.required], // only if for onePerson or Family
      onlyEmail: [false],
      canIcallYou: [false],
      canITextYou: [false],
      email: ['', Validators.required], // required
      ddd: ['', Validators.required],
      phone: ['', Validators.required],
      cep: [''], // only if for onePerson or Family
      nursery: [],
      room: [],
      dependents: this.fb.array([]),
    });
    this.registerFieldsSubscriptions();
  }

  public registerFieldsSubscriptions(): void {
    const forWho = this.cotationForm.get('forWho');
    const hasHealthInsurance = this.cotationForm.get('hasHealthInsurance');

    forWho.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fieldValue: ForWho) => {
        this.forWho = fieldValue;
        this.you = You[fieldValue];
        this.nameOption = NameOptions[fieldValue];
        this.idOption = IdOptions[fieldValue];
      });

    hasHealthInsurance.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fieldValue: string) => {
        const boolValue = fieldValue === 'true';
        this.hasHealthInsurance = boolValue;
      });
  }

  public addDependent(dependent: Dependent): void {
    this.dependentGroup.push(this.creadeDepend(dependent));
  }

  get dependentGroup(): FormArray {
    return this.cotationForm.get('dependents') as FormArray;
  }

  public creadeDepend(dependent: Dependent): FormGroup {
    return this.fb.group({
      name: [dependent.name],
      birthDay: [dependent.birthDay, Validators.required],
      sex: ['', Validators.required],
    });
  }

  public onSubmit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
