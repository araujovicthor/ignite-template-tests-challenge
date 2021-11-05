import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStatementUseCase } from "./CreateStatementUseCase";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { to_id } = request.params;
    const { amount, description } = request.body;

    const splittedPath = request.originalUrl.split("/");

    let type;

    if (to_id) {
      type = splittedPath[splittedPath.length - 2] as OperationType;
    } else {
      type = splittedPath[splittedPath.length - 1] as OperationType;
    }

    const createStatement = container.resolve(CreateStatementUseCase);

    if (type === "transfer") {
      const statement = await createStatement.execute({
        user_id,
        type,
        amount: -amount,
        description,
      });
    }

    const statement = await createStatement.execute({
      user_id,
      type,
      amount,
      description,
    });

    return response.status(201).json(statement);
  }
}
