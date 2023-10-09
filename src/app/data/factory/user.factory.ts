import { UserRepository } from '@domain/repository';
import { CreateUserUseCase } from '@domain/use-case';

export const createUserUseCaseFactory = (userRepository: UserRepository) =>
  new CreateUserUseCase(userRepository);

export const userUseCaseProviders = {
  createUser: {
    provide: CreateUserUseCase,
    useFactory: createUserUseCaseFactory,
    deps: [UserRepository],
  },
};
