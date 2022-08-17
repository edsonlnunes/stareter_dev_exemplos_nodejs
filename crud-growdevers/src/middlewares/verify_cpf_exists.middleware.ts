import { Request, Response, NextFunction } from "express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { growdeversDB } from "../db/growdevers";

export class VerifyCpfExistsMiddleware {
  verifyCpfExists(request: Request, response: Response, next: NextFunction) {
    const { cpf } = request.body;

    if (!growdeversDB.some((g) => g.cpf === cpf)) {
      return next();
    } else {
      return response.status(400).json({ error: "CPF JÁ EXISTE" });
    }
  }
}
