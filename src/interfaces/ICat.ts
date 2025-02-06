import { FormikErrors } from "formik";

export interface IUser {
  id: string;
  name: string;
  email: string;
  customerId: string;
  phone: string;
  deleted_at: string | null;
  address: string;
  role: string;
  status: string;
}

export interface ICat {
  id: string;
  name: string;
  dateOfBirth: string;
  isNeutered: boolean;
  weight: string;
  personality: string;
  getsAlongWithOtherCats: string;
  food: string;
  medication: string | null;
  behaviorAtVet: string | null;
  vaccinationsAndTests: Array<"rabies" | "tripleFeline" | "FIV/Felv test">;
  photo?: string;
  photoFile?: File;
  deleted_at: string | null;
  user: {
    id: string;
    name?: string;
    email?: string;
    customerId?: string;
    phone?: string;
    deleted_at?: string | null;
    address?: string;
    role?: string;
    status?: string;
  };
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

export interface CatFormData {
  name: string;
  dateOfBirth: string;
  isNeutered: boolean;
  weight: string;
  personality: string;
  getsAlongWithOtherCats: "yes" | "no" | "unsure";
  food: string;
  medication: string;
  behaviorAtVet: string;
  vaccinationsAndTests: Array<"rabies" | "tripleFeline" | "FIV/Felv test">;
  photoFile?: File;
  userId: string;
}

export interface CatRegisterRequest {
  name: string;
  dateOfBirth: string;
  isNeutered: boolean;
  personality: string;
  getsAlongWithOtherCats: "yes" | "no" | "unsure";
  food: string;
  medication: string;
  behaviorAtVet: string;
  vaccinationsAndTests: Array<"rabies" | "tripleFeline" | "FIV/Felv test">;
  photoFile: File;
  userId: string;
}

export type VaccineMapType = {
  [key: string]: "rabies" | "tripleFeline" | "FIV/Felv test";
};

export interface EditCatModalProps {
  cat: ICat;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCat: ICat, token: string) => void;
}

export interface CustomFileUploadProps {
  onFileSelect: (file: File) => void;
  error?: FormikErrors<File>;
  touched?: boolean;
  label: string;
}
