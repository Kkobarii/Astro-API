export interface Planet {
    id: number;
    name: string;
    iconUrl: string;
    [key: string]: any; // for any other properties that a planet might have
  }

 export interface Gas {
    id: number;
    name: string;
    iconUrl: string;
    [key: string]: any; // for any other properties that a gas might have

    partsPerUnit: number;
  }

  export interface Resource {
    id: number;
    name: string;
    iconUrl: string;
    [key: string]: any; // for any other properties that a resource might have
  }


export {}