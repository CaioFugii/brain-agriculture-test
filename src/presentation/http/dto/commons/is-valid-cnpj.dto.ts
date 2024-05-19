import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidateCNPJ } from '../../../../commons/utils/validate-cnpj';

@ValidatorConstraint({ name: 'IsValidCNPJ', async: false })
export class IsValidCNPJ implements ValidatorConstraintInterface {
  validate(cnpj: string, _: ValidationArguments) {
    return ValidateCNPJ(cnpj);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid CNPJ. value: ${args.value}`;
  }
}
