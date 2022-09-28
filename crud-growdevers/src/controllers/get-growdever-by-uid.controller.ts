import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";

export class GetGrowdeverByUidController {
  getByUid(request: Request, response: Response) {
    const { uid } = request.params;

    const growdever = growdeversDB.find((element) => element.uid === uid);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    return response.status(200).json({
      uid: growdever.uid,
      name: growdever.name,
      birth: growdever.birth,
      cpf: growdever.cpf,
      skills: growdever.skills,
      status: growdever.status,
    });
  }
}
