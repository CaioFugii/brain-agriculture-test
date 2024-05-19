import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidPlantation', async: false })
export class IsValidPlantationConstraint
  implements ValidatorConstraintInterface
{
  private readonly validValues = [
    'soja',
    'milho',
    'algodão',
    'café',
    'cana de açúcar',
  ];
  validate(values: string[], _: ValidationArguments) {
    return values.every((value) => {
      if (typeof value === 'string') {
        return this.validValues.includes(value.toLowerCase());
      }
    });
  }

  defaultMessage(_: ValidationArguments) {
    return `The array contains invalid values. The allowed values are: ${this.validValues.join(', ')}`;
  }
}
