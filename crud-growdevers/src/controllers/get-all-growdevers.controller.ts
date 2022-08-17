import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";

export class GetAllGrowdeversController {
  getAll(request: Request, response: Response) {
    const { status, name } = request.query;

    let growdevers = growdeversDB.map((element) => {
      return {
        uid: element.uid,
        name: element.name,
        age: element.age,
        skills: element.skills,
        status: element.status,
      };
    });

    if (status) {
      growdevers = growdevers.filter(
        (g) => g.status.toUpperCase() === (status as string).toUpperCase()
      );
    }

    if (name) {
      growdevers = growdevers.filter((g) =>
        g.name.toLowerCase().includes((name as string).toLocaleLowerCase())
      );
    }

    return response.status(200).json(growdevers);
  }
}
