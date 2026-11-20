import type { ExpensesService } from "./expenses.service.js";
import type { Request, Response } from "express";
import { expensesQuerySchema, type CreateExpenseBody } from "./expenses.schema.js";
import type { UpdateExpenseDto } from "./expenses.types.js";

export class ExpensesController {
    constructor(private readonly service: ExpensesService) { }

    getAll = async (req: Request<{ tripId: string }>, res: Response) => {
        const { activityId } = expensesQuerySchema.parse(req.query);
        const { tripId } = req.params;

        const expenses = activityId
            ? await this.service.getAllByActivityId(activityId, tripId)
            : await this.service.getAll(tripId);
        res.json(expenses);
    }
    create = async (req: Request<{ tripId: string }, {}, CreateExpenseBody>, res: Response) => {
        const expense = await this.service.create({ ...req.body, tripId: req.params.tripId });
        res.status(201).json('Expense created! Expense ID: ' + expense.id);
    }
    delete = async (req: Request<{ id: string, tripId: string }>, res: Response) => {
        await this.service.delete(req.params.id, req.params.tripId);
        res.status(204).end();
    }
    update = async (req: Request<{ id: string, tripId: string }, {}, UpdateExpenseDto>, res: Response) => {
        await this.service.update(req.params.id, req.params.tripId, req.body);
        res.status(200).json('Expense updated!');
    }
}