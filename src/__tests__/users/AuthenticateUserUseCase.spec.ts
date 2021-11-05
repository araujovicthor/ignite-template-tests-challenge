import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../../modules/users/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUser", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to auth an user", async () => {
    const createdUser = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const { user, token } = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(token).not.toBeUndefined();
  });
});
