export class Action {
  title: string;
  description: string;
  dateBegin: string;
  dateEnd: string;

  constructor() {
    this.title = "";
    this.description = "";
    this.dateBegin = Date.now.toString().split("T")[0];
    this.dateEnd = Date.now.toString().split("T")[0];
  }
}

export interface IAction {
  dateEnd: string;
  dateBegin: string;
  description: string;
  title: string;
}
