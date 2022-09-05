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
        cpf: element.cpf,
        skills: element.skills,
        status: element.status,
      };
    });

    if (status || name) {
      growdevers = growdevers.filter((growdev) => {
        let filtroStatus = false;
        let filtroNome = false;

        if (status) {
          filtroStatus =
            growdev.status.toUpperCase() === (status as string).toUpperCase();
        }

        if (name) {
          filtroNome = growdev.name
            .toLowerCase()
            .includes((name as string).toLocaleLowerCase());
        }

        return filtroStatus || filtroNome;
      });
    }

    return response.status(200).json(growdevers);
  }
}
