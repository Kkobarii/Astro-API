import { FieldProps } from "formik/dist/Field";

export interface Planet {
  id: number;
  name: string;
  type: string;

  size: string;
  difficulty: string;
  sun: string;
  wind: string;

  iconUrl: string;
  [key: string]: any; // for any other properties that a planet might have
}

export interface Gas {
  id: number;
  name: string;
  iconUrl: string;
  [key: string]: any; // for any other properties that a gas might have

  //partsPerUnit: number;
}

export interface Resource {
  id: number;
  name: string;
  iconUrl: string;
  [key: string]: any; // for any other properties that a resource might have
}

export type CheckboxFieldProps = FieldProps & { label: string };

export interface PlanetFormProps {
  //gases:
  description: string;
  difficulty: string;
  name: string;
  size: string;
  sun: string;
  type: string;
  wind: string;
  resources?: { selected: boolean; location: string; id: number }[];
  gases?: { selected: boolean; partsPerUnit: string; id: number }[];
}

export {};
