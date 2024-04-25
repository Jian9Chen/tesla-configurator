export class Step {
  route: string;
  id: string;
  description: string;
  index: number;
  disabled: boolean;
  constructor(data: {route: string, description: string, index: number, id: string, disabled: boolean}) {
    this.route = data.route;
    this.id = data.id;
    this.description = data.description;
    this.index = data.index;
    this.disabled = data.disabled;
  }
}
