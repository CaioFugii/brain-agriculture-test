import { ValidateCNPJ } from './validate-cnpj';

describe('ValidateCNPJ', () => {
  it('should return false for CNPJ with invalid length', () => {
    expect(ValidateCNPJ('123456789012')).toBe(false); // Length is less than 14
    expect(ValidateCNPJ('123456789012345')).toBe(false); // Length is more than 14
  });

  it('should return false for CNPJ with all identical digits', () => {
    expect(ValidateCNPJ('11111111111111')).toBe(false);
    expect(ValidateCNPJ('22222222222222')).toBe(false);
  });

  it('should return false for invalid CNPJ', () => {
    expect(ValidateCNPJ('12345678901234')).toBe(false); // Invalid CNPJ
  });

  it('should return true for valid CNPJ', () => {
    expect(ValidateCNPJ('04252011000110')).toBe(true); // Valid CNPJ
    expect(ValidateCNPJ('11444777000161')).toBe(true); // Another valid CNPJ
  });
});
