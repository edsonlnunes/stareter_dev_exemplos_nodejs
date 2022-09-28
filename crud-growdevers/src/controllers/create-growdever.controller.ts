import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";
import { Growdever } from "../models/growdever.model";

export class CreateGrowdeverController {
  create(request: Request, response: Response) {
    const { name, birth, cpf, skills } = request.body;

    const growdever = new Growdever(name, new Date(birth), cpf, skills);

    growdeversDB.push(growdever);

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
