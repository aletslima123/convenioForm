import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import {
  Dependent,
  DependentsNameOptions,
  DependentsNameOptionsPlural,
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
  dependentNameOption: DependentsNameOptions;
  dependentsNameOptionsPlural: DependentsNameOptionsPlural;
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
      name: ['', Validators.required], // or companyName
      sex: [''],
      id: [], // CPF ou CNPJ validation
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
    const birthDay = this.cotationForm.get('birthDay');

    forWho.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fieldValue: ForWho) => {
        this.forWho = fieldValue;

        this.you = You[fieldValue];
        this.nameOption = NameOptions[fieldValue];
        this.idOption = IdOptions[fieldValue];

        if (this.forWho !== ForWho.OnePerson) {
          this.dependentNameOption = DependentsNameOptions[fieldValue];
          this.dependentsNameOptionsPlural =
            DependentsNameOptionsPlural[fieldValue];
        }
      });

    hasHealthInsurance.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fieldValue: string) => {
        const boolValue = fieldValue === 'true';
        this.hasHealthInsurance = boolValue;
      });

    birthDay.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe(() => {
        if (this.forWho === ForWho.Family) {
          // Adicionar o dependente apenas uma vez
          this.addDependent({
            dependentName: this.cotationForm.get('name').value,
            dependentBirthDay: this.cotationForm.get('birthDay').value,
            depedentSex: this.cotationForm.get('sex').value, // não está sendo alterado o valor
          } as Dependent);
        }
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
      dependentName: [dependent.dependentName],
      dependentBirthDay: [dependent.dependentBirthDay, Validators.required],
      depedentSex: ['', Validators.required],
    });
  }

  public onSubmit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
