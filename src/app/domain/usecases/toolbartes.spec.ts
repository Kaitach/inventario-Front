import { TestBed } from '@angular/core/testing';
import { StateUseCase } from './toolbarusecase';


describe('StateUseCase', () => {
  let useCase: StateUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    useCase = TestBed.inject(StateUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('defaultLogin', () => {
    it('should set "key" to "false" if "key" is not set in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(localStorage, 'setItem');

      useCase.defaultLogin();

      expect(localStorage.getItem).toHaveBeenCalledWith('key');
      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'false');
    });

    it('should not set "key" if "key" is already set in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('true');
      spyOn(localStorage, 'setItem');

      useCase.defaultLogin();

      expect(localStorage.getItem).toHaveBeenCalledWith('key');
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('activeLogin', () => {
    it('should set "key" to "true" and emit the new status', () => {
      spyOn(localStorage, 'setItem');
      spyOn(useCase.currentStatusEmitter, 'next');

      useCase.activeLogin();

      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'true');
      expect(useCase.currentStatus).toBeTrue();
      expect(useCase.currentStatusEmitter.next).toHaveBeenCalledWith(true);
    });
  });
});