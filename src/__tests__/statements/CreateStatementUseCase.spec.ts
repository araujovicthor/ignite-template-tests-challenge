import { InMemoryStatementsRepository } from "../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../../modules/statements/useCases/createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../../modules/statements/useCases/createStatement/ICreateStatementDTO";
import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("CreateStatement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able possible to do a deposit", async () => {
    const user = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const statement = {
      user_id: user.id,
      type: "deposit",
      amount: 100,
      description: "description",
    } as ICreateStatementDTO;

    const deposit = await createStatementUseCase.execute(statement);

    expect(deposit).toHaveProperty("id");
  });
});
