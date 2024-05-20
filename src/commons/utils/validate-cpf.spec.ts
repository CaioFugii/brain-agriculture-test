import { ValidateCPF } from './validate-cpf';

describe('ValidateCPF', () => {
  it('should return false for CPF with invalid length', () => {
    expect(ValidateCPF('1234567890')).toBe(false); // Length is less than 11
    expect(ValidateCPF('123456789012')).toBe(false); // Length is more than 11
  });

  it('should return false for CPF with all identical digits', () => {
    expect(ValidateCPF('11111111111')).toBe(false);
    expect(ValidateCPF('22222222222')).toBe(false);
  });

  it('should return false for invalid CPF', () => {
    expect(ValidateCPF('12345678910')).toBe(false); // Invalid CPF
  });

  it('should return true for valid CPF', () => {
    expect(ValidateCPF('12345678910')).toBe(false); // Invalid CPF, added for illustration
    expect(ValidateCPF('93541134780')).toBe(true); // Valid CPF
    expect(ValidateCPF('52734151014')).toBe(true); // Another valid CPF
  });
});
