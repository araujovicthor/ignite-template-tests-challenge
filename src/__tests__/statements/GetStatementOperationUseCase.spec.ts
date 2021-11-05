import { InMemoryStatementsRepository } from "../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../../modules/statements/useCases/createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../../modules/statements/useCases/createStatement/ICreateStatementDTO";
import { GetStatementOperationUseCase } from "../../modules/statements/useCases/getStatementOperation/GetStatementOperationUseCase";
import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUserCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("GetStatementOperation", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUserCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to get operation", async () => {
    const { id } = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const operation = {
      user_id: id!,
      type: "deposit",
      amount: 100,
      description: "descriprtion",
    } as ICreateStatementDTO;

    const createStatement = await createStatementUserCase.execute(operation);

    const getStatement = await getStatementOperationUseCase.execute({
      user_id: id!,
      statement_id: createStatement.id!,
    });

    expect(getStatement).toHaveProperty("id");
    expect(getStatement.user_id).toEqual(createStatement.user_id);
  });
});
