import { InformativeModule } from './informative.module';

describe('InformativeModule', () => {
  let informativeModule: InformativeModule;

  beforeEach(() => {
    informativeModule = new InformativeModule();
  });

  it('should create an instance', () => {
    expect(informativeModule).toBeTruthy();
  });
});
