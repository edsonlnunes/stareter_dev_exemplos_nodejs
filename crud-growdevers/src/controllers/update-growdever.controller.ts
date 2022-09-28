import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";

export class UpdateGrowdeverController {
  update(request: Request, response: Response) {
    const { name, birth, status } = request.body;
    const { uid } = request.params;

    const growdever = growdeversDB.find((element) => element.uid === uid);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.updateInformation(name, new Date(birth), status);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
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
