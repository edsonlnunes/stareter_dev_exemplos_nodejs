import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";

export class GetAllGrowdeversController {
  getAll(request: Request, response: Response) {
    const growdevers = growdeversDB.map((element) => {
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
