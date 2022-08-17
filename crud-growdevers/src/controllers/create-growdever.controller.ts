import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";
import { Growdever } from "../models/growdever.model";

export class CreateGrowdeverController {
  create(request: Request, response: Response) {
    const { name, age, cpf, skills } = request.body;

    const growdever = new Growdever(name, age, cpf, skills);

    growdeversDB.push(growdever);

    return response.status(200).json({
      uid: growdever.uid,
      name: growdever.name,
      age: growdever.age,
      cpf: growdever.cpf,
      skills: growdever.skills,
      status: growdever.status,
    });
  }
}
