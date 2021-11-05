import { InMemoryStatementsRepository } from "../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "../../modules/statements/useCases/getBalance/GetBalanceUseCase";
import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("GetBalance", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("Should be able to get balance", async () => {
    const { id } = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const balance = await getBalanceUseCase.execute({ user_id: id! });

    expect(balance).toHaveProperty("statement");
    expect(balance).toHaveProperty("balance");
  });
});
