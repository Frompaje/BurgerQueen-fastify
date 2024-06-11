import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserRepository } from "../../interface/user-repository";
import { repositoryDependencies } from "./factory/make-repository-dependencies";
import { makeUserMock } from "./factory/make-user";
import { UpdateEmailUseCase } from "../user/user-update-email-usecase";

describe("Update user", () => {
  let userRepository: UserRepository;
  let sut: UpdateEmailUseCase;

  beforeEach(() => {
    const depedencies = repositoryDependencies();

    userRepository = depedencies.userRepository;

    sut = new UpdateEmailUseCase(userRepository);
  });

  it("Should update email the user", async () => {
    const emailUpdate = "Another@gmail.com";
    const userMocking = makeUserMock({ email: emailUpdate });

    vi.spyOn(userRepository, "findUserByIdAndEmail").mockResolvedValue(
      userMocking
    );
    vi.spyOn(userRepository, "updateEmail").mockResolvedValue(userMocking);

    const resultUpdateEmail = await sut.execute({
      id: userMocking.id,
      email: userMocking.email,
      emailUpdate: emailUpdate,
    });

    expect(userRepository.findUserByIdAndEmail).toBeCalledTimes(1);
    expect(resultUpdateEmail?.email).toEqual(emailUpdate);
  });
});
