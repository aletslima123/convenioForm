export enum ForWho {
  OnePerson = 'OnePerson',
  Family = 'Family',
  Business = 'Business',
}

export enum You {
  OnePerson = 'Você',
  Family = 'Sua família',
  Business = 'Sua empresa',
}

export enum NameOptions {
  OnePerson = 'Nome completo',
  Family = 'Nome completo',
  Business = 'Nome da empresa',
}

export enum IdOptions {
  OnePerson = 'CPF',
  Family = 'CPF',
  Business = 'CNPJ',
}

export enum Sex {
  M = 'M',
  F = 'F',
}

export class Dependent {
  name?: string;
  birthDay: any; // moment
  sex: Sex;
}
