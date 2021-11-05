import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "../../modules/users/useCases/showUserProfile/ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("ShowUser", () => {
  beforeAll(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });

  it("should be able show user profile", async () => {
    const { id, name } = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const user = await showUserProfileUseCase.execute(id!);

    expect(user).toHaveProperty("email");
    expect(user.name).toBe(name);
  });
});
