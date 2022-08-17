import { Request, Response } from "express";
import { Growdever } from "../models/growdever.model";

export class GetAllGrowdeversController {
  getAll(request: Request, response: Response) {
    const growdevers = Growdever.growdevers.map((element) => {
      return {
        uid: element.uid,
        name: element.name,
        age: element.age,
        skills: element.skills,
      };
    });

    return response.status(200).json(growdevers);
  }
}
