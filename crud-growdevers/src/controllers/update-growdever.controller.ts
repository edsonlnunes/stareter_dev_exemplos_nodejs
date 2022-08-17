import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";

export class UpdateGrowdeverController {
  update(request: Request, response: Response) {
    const { name, age, status } = request.body;
    const { uid } = request.params;

    const growdever = growdeversDB.find((element) => element.uid === uid);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    growdever.updateInformation(name, age, status);

    return response.status(200).json({
      uid: growdever.uid,
      name: growdever.name,
      age: growdever.age,
      skills: growdever.skills,
      status: growdever.status,
    });
  }
}
