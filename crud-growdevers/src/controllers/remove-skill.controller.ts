import { Request, Response } from "express";
import { Growdever } from "../models/growdever.model";

export class RemoveSkillController {
  removeSkill(request: Request, response: Response) {
    const { skill } = request.body;
    const { uid } = request.params;

    const growdever = Growdever.growdevers.find(
      (element) => element.uid === uid
    );

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    growdever.removeSkill(skill);

    return response.status(200).json({
      skills: growdever.skills,
    });
  }
}
