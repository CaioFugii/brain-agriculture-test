import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidArea(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidArea',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          return obj.arable_area + obj.vegetation_area <= value;
        },
        defaultMessage(_: ValidationArguments) {
          return 'The sum of arable_area and vegetation_area should not be greater than total_area.';
        },
      },
    });
  };
}
