import { Router } from "express";
import { validateBody } from "../../middlewares/validate-body.js";
import { createExpenseSchema } from "./expenses.schema.js";
import { ExpensesController } from "./expenses.controller.js";
import { ExpensesService } from "./expenses.service.js";
import { PostgresExpensesRepository } from "./expenses.repository.js";

const controller = new ExpensesController(new ExpensesService(new PostgresExpensesRepository()));
export const expensesRouter = Router({ mergeParams: true });

expensesRouter.get('/', controller.getAll);
expensesRouter.post('/', validateBody(createExpenseSchema), controller.create);
expensesRouter.delete('/:id', controller.delete);
expensesRouter.put('/:id', validateBody(createExpenseSchema), controller.update);
