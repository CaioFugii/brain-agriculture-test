import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { IsValidCNPJ } from './is-valid-cnpj.dto';
import { IsValidCPF } from './is-valid-cpf.dto';

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPFOrCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const isCPFValid = new IsValidCPF().validate(value, args);
          const isCNPJValid = new IsValidCNPJ().validate(value, args);
          return isCPFValid || isCNPJValid;
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid CPF or CNPJ, value: ${args.value}`;
        },
      },
    });
  };
}
