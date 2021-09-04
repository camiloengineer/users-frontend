import { DniToNumberPipe } from './dni-to-number.pipe';

describe('DniToNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new DniToNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
