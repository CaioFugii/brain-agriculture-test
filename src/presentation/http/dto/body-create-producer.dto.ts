import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidArray', async: false })
export class IsValidArrayConstraint implements ValidatorConstraintInterface {
  private readonly validValues = [
    'soja',
    'milho',
    'algodão',
    'café',
    'cana de açucar',
  ];
  validate(values: string[], args: ValidationArguments) {
    return values.every((value) => {
      if (typeof value === 'string') {
        this.validValues.includes(value.toLowerCase());
      }
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `The array contains invalid values. The allowed values are: ${this.validValues.join(', ')}`;
  }
}

export class BodyCreateProducerDTO {
  @ApiProperty({
    description: 'CPF / CNPJ of rural producer without mask',
    type: String,
    required: true,
    example: '12345678910',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  @MinLength(11)
  document: string;

  @ApiProperty({
    description: 'Producer Name',
    type: String,
    required: true,
    example: 'Tonic Milho producer',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  producer_name: string;

  @ApiProperty({
    description: 'Farm Name',
    type: String,
    required: true,
    example: 'Milharal farm',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  farm_name: string;

  @ApiProperty({
    description: 'City name',
    type: String,
    required: true,
    example: 'Campinas',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  city: string;

  @ApiProperty({
    description: 'State name',
    type: String,
    required: true,
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  state: string;

  @ApiProperty({
    description: 'Total area of farm (ha)',
    type: Number,
    required: true,
    example: 50,
  })
  @IsInt()
  @Min(0)
  @Max(10000000)
  total_area: Number;

  @ApiProperty({
    description: 'Arable area of farm (ha)',
    type: Number,
    required: true,
    example: 30,
  })
  @IsInt()
  @Min(0)
  @Max(10000000)
  arable_area: Number;

  @ApiProperty({
    description: 'Vegetation area of farm (ha)',
    type: Number,
    required: true,
    example: 20,
  })
  @IsInt()
  @Min(0)
  @Max(10000000)
  vegetation_area: Number;

  @ApiProperty({
    description: 'List of plantations of farm',
    type: Array<string>,
    required: true,
    example: ['Soja', 'Milho', 'Algodão', 'Cana de açucar'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsValidArrayConstraint)
  plantation: string[];
}
