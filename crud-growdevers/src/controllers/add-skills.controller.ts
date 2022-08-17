import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";
import { Growdever } from "../models/growdever.model";

export class AddSkillsController {
  addSkills(request: Request, response: Response) {
    const { skills } = request.body;
    const { uid } = request.params;

    const growdever = growdeversDB.find((element) => element.uid === uid);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    growdever.addSkills(skills);

    return response.status(200).json({
      skills: growdever.skills,
    });
  }
}
