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
        let filterStatus = false;
        let filterNome = false;

        if (status) {
          filterStatus =
            growdev.status.toUpperCase() === (status as string).toUpperCase();
        }

        if (name) {
          filterNome = growdev.name
            .toLowerCase()
            .includes((name as string).toLocaleLowerCase());
        }

        return filterStatus || filterNome;
      });
    }

    return response.status(200).json(growdevers);
  }
}
