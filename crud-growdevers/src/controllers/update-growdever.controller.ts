import { Request, Response } from "express";
import { Growdever } from "../models/growdever.model";

export class UpdateGrowdeverController {
  update(request: Request, response: Response) {
    const { name, age } = request.body;
    const { uid } = request.params;

    const growdever = Growdever.growdevers.find(
      (element) => element.uid === uid
    );

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    growdever.updateInformation(name, age);

    return response.status(200).json({
      uid: growdever.uid,
      name: growdever.name,
      age: growdever.age,
      skills: growdever.skills,
    });
  }
}
