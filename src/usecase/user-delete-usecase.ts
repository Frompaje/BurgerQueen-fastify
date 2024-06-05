import { User } from "@prisma/client";
import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";

interface DeleteUseCaseRequest {
  id: string;
}

interface DeleteUsaCaseResponse {
  user: User;
}

export class DeleteUseCase {
  constructor(private readonly userRepository: UserRepository) { }
  async execute({
    id,
  }: DeleteUseCaseRequest): Promise<DeleteUsaCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserDoesntExist();
    }

    await this.userRepository.delete(id);

    return { user };
  }
}


