import { Request, Response } from "express";
import { Growdever } from "../models/growdever.model";

export class RemoveGrowdeverController {
  remove(request: Request, response: Response) {
    const { uid } = request.params;

    const indexGrowdever = Growdever.growdevers.findIndex(
      (element) => element.uid === uid
    );

    if (indexGrowdever < 0) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    Growdever.growdevers.splice(indexGrowdever, 1);

    return response.status(200).send();
  }
}
