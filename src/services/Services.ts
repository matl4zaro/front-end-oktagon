import axios from "axios";

import { Action } from "../models/action";
import { Campaign, ICampaign } from "../models/campaign";

export default class Services {
  static api = axios.create({
    baseURL: "http://devserver.oktagongames.com:5000/api/",
    responseType: "json",
  });

  static async getCampaigns(): Promise<Campaign[]> {
    return await this.api
      .get("campaign")
      .then((response: { data: Campaign[] }) => {
        console.log(response);
        return response.data;
      })
      .catch((error: any) => {
        console.log(error);
        return error;
      });
  }

  static async getCampaignById(id: string): Promise<Campaign> {
    return await this.api
      .get(`campaign/${id}`)
      .then((response: { data: Campaign }) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  static async createCampaign(campaign: ICampaign): Promise<Campaign> {
    return await this.api
      .post("campaign", campaign)
      .then((response: { data: Campaign }) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  static async createActions(actions: Action[], id: string): Promise<Campaign> {
    return await this.api
      .put(`campaign/${id}`, { actions: actions })
      .then((response: { data: Campaign }) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  static async deleteCampaignById(id: string): Promise<Campaign> {
    return await this.api
      .delete(`campaign/${id}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
