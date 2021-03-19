import { Action, IAction } from "./action";

export class Campaign {
  _id: string;
  imgUrl: string;
  title: string;
  description: string;
  dateBegin: string;
  dateEnd: string;
  actions: Array<Action>;

  constructor() {
    this._id = "";
    this.imgUrl = "";
    this.title = "";
    this.description = "";
    this.dateBegin = "";
    this.dateEnd = "";
    this.actions = [];
  }
}

export interface ICampaign {
  title: string;
  description: string;
  imgUrl: string;
  dateEnd: string;
  dateBegin: string;
}
