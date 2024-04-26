export class CarConfiguration {
  configs: ConfigurationDetail[];
  towHitch: boolean;
  yoke: boolean;

  constructor(data: {configs: ConfigurationDetail[], towHitch: boolean, yoke: boolean}) {
    this.configs = data.configs;
    this.towHitch = data.towHitch;
    this.yoke = data.yoke;
  }
}

export class ConfigurationDetail {
  id: number;
  description: string;
  price: number;
  range: number;
  speed: number;

  constructor(data: {id: number, description: string, price: number, range: number, speed: number}) {
    this.id = data.id;
    this.description = data.description;
    this.price = data.price;
    this.range = data.range;
    this.speed = data.speed;
  }
}

export class SelectedCarConfiguration {
  config: ConfigurationDetail;
  towHitch?: boolean;
  yoke?: boolean;

  constructor(data: {config: ConfigurationDetail, towHitch?: boolean, yoke?: boolean}) {
    this.config = data.config;
    this.towHitch = data.towHitch;
    this.yoke = data.yoke;
  }
}

