import { UserRepository } from "../../repository";
import { LoginUserUseCase } from "../user/user-login.usercase";

describe('UserLoginUseCase', () => {
    let userRepository: UserRepository;
    let useCase: LoginUserUseCase;

    beforeEach(() => {
        // Crea un spy en el método 'login' del UserRepository
        userRepository = jasmine.createSpyObj('UserRepository', ['login']);
        useCase = new LoginUserUseCase(userRepository);
    });

    it('should execute the use case', () => {
        const userData = {
            email: 'test@test.com',
            password: 'test_password'
        };

        // Llama al método 'execute'
        useCase.execute(userData);

        // Verifica que el método 'login' del UserRepository se haya llamado
        expect(userRepository.login).toHaveBeenCalled();
    });
});
