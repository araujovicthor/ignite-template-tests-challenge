import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "../../modules/users/useCases/createUser/CreateUserError";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUser", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able create new user", async () => {
    const user = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with an existing email", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "John Doe",
        email: "john@email.com",
        password: "123456",
      });
      await createUserUseCase.execute({
        name: "John Doe",
        email: "john@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});
