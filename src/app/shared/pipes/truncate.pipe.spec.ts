import {TruncatePipe} from './truncate-pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate a string longer than the limit and add ellipsis', () => {
    const longString = 'This is a very long text that needs to be truncated.';
    const result = pipe.transform(longString, 15);
    expect(result).toBe('This is a very ...');
  });

  it('should return the original string if it is shorter than the limit', () => {
    const shortString = 'Short text';
    const result = pipe.transform(shortString, 20);
    expect(result).toBe('Short text');
  });

  it('should handle null or undefined input', () => {
    expect(pipe.transform(null, 10)).toBe('');
    expect(pipe.transform(undefined, 10)).toBe('');
  });
});

