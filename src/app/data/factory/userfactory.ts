import { UserRepository } from "src/app/domain";
import { CreateUserUseCase } from "src/app/domain/usecases/user/user-register.usecase";


export const createUserUseCaseFactory = (userRepository: UserRepository) =>
  new CreateUserUseCase(userRepository);

  export const LoginUserUseCaseFactory = (userRepository: UserRepository) =>
  new CreateUserUseCase(userRepository);
  export const userUseCaseProviders = {
      
   
    createUser: {
      provide: CreateUserUseCase,
      useFactory: createUserUseCaseFactory,
      deps: [UserRepository],
    },
    login: {
      provide: CreateUserUseCase,
      useFactory: LoginUserUseCaseFactory,
      deps: [UserRepository],
    },
  };
  
  
