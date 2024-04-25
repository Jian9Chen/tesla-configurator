export interface BasicCar {
  code: string;
  description: string;
}

export class Car implements BasicCar{
  code: string;
  description: string;
  colors: CarColor[];

  constructor(data: {code: string, description: string, colors: CarColor[]}) {
    this.code = data.code;
    this.description = data.description;
    this.colors = data.colors;
  }
}

export class SelectedCar implements BasicCar {
  code: string;
  description: string;
  color: CarColor;

  constructor(data: {code: string, description: string, color: CarColor}) {
    this.code = data.code;
    this.description = data.description;
    this.color = data.color;
  }
}

export class CarColor {
  code: string;
  description: string;
  price: number;

  constructor(data: {code: string, description: string, price: number}) {
    this.code = data.code;
    this.description = data.description;
    this.price = data.price;
  }
}
