import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ValidateCPF } from '../../utils/validate-cpf';

@ValidatorConstraint({ name: 'IsValidCPF', async: false })
export class IsValidCPF implements ValidatorConstraintInterface {
  validate(cpf: string, _: ValidationArguments) {
    return ValidateCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid CPF. value: ${args.value}`;
  }
}
