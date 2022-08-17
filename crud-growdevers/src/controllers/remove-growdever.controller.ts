import { Request, Response } from "express";
import { growdeversDB } from "../db/growdevers";
import { Growdever } from "../models/growdever.model";

export class RemoveGrowdeverController {
  remove(request: Request, response: Response) {
    const { uid } = request.params;

    const indexGrowdever = growdeversDB.findIndex(
      (element) => element.uid === uid
    );

    if (indexGrowdever < 0) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    growdeversDB.splice(indexGrowdever, 1);

    return response.status(200).send();
  }
}
