import { Router, Request, Response } from "express";
import { AddSkillsController } from "./controllers/add-skills.controller";

import { CreateGrowdeverController } from "./controllers/create-growdever.controller";
import { GetAllGrowdeversController } from "./controllers/get-all-growdevers.controller";
import { GetGrowdeverByUidController } from "./controllers/get-growdever-by-uid.controller";
import { RemoveGrowdeverController } from "./controllers/remove-growdever.controller";
import { RemoveSkillController } from "./controllers/remove-skill.controller";
import { UpdateGrowdeverController } from "./controllers/update-growdever.controller";
import { ValidateCpfMiddleware } from "./middlewares/validate-cpf.middleware";
import { VerifyCpfExistsMiddleware } from "./middlewares/verify-cpf-exists.middleware";

const router = Router();

router.get("/", (req: Request, res: Response) => res.send("<b>TUDO CERTO</b>"));

// growdever
router.get("/growdevers", new GetAllGrowdeversController().getAll);
router.get("/growdevers/:uid", new GetGrowdeverByUidController().getByUid);
router.post(
  "/growdevers",
  new ValidateCpfMiddleware().validateCpf,
  new VerifyCpfExistsMiddleware().verifyCpfExists,
  new CreateGrowdeverController().create
);
router.put("/growdevers/:uid", new UpdateGrowdeverController().update);
router.delete("/growdevers/:uid", new RemoveGrowdeverController().remove);

// skills do growdever

router.post("/growdevers/:uid/skills", new AddSkillsController().addSkills);
router.put("/growdevers/:uid/skills", new RemoveSkillController().removeSkill);

export default router;
