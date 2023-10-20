import { Observable } from "rxjs";
import { UserModel } from "../../models";
import { IuserRegister } from "../../models/userRegister";
import { UserRepository } from "../../repository";
import { CreateUserUseCase } from "../user/user-register.usecase";

describe('CreateUserUseCase', () => {
    let userRepository: UserRepository;
    let useCase: CreateUserUseCase;

    beforeEach(() => {
        userRepository = {} as UserRepository;
        useCase = new CreateUserUseCase(userRepository);
    });

    it('should execute the use case', () => {
        const userData: IuserRegister = {
            name: {
                firstName: "",
                lastName: ""
            },
            email: "",
            password: "",
            role: "",
            branchId: ""
        };

        const userRepositoryCreateUserSpy = jasmine.createSpy('createUser');
        userRepositoryCreateUserSpy.and.returnValue(new Observable<UserModel>());
        userRepository.createUser = userRepositoryCreateUserSpy;

        const result = useCase.execute(userData);

        expect(userRepositoryCreateUserSpy).toHaveBeenCalledWith(userData);
        expect(result).toBeInstanceOf(Observable);
    });
});
