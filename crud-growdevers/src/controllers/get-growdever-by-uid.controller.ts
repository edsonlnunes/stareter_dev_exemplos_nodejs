import { Request, Response } from "express";
import { Growdever } from "../models/growdever.model";

export class GetGrowdeverByUidController {
  getByUid(request: Request, response: Response) {
    const { uid } = request.params;

    const growdever = Growdever.growdevers.find(
      (element) => element.uid === uid
    );

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    return response.status(200).json({
      uid: growdever.uid,
      name: growdever.name,
      age: growdever.age,
      skills: growdever.skills,
    });
  }
}
