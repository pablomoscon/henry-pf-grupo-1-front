export interface ICat {
  id: string;
  name: string;
  dateOfBirth: string;
  isNeutered: boolean;
  weight: string;
  personality: string;
  getsAlongWithOtherCats: string;
  food: string;
  medication: string;
  behaviorAtVet: string;
  vaccinationsAndTests: string[];
  photo: string;
  userId: string;
}

export interface CatRegister {
  name: string;
  dateOfBirth: string;
  isNeutered: boolean;
  personality: string;
  getsAlongWithCats: string;
  food: string;
  medication: string;
  behaviorAtVet: string;
  vaccinations: string[];
}
