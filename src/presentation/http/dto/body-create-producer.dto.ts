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
} from 'class-validator';
import { IsValidPlantationConstraint } from '../../../commons/application/dtos/is-valid-plantation.dto';
import { IsCPFOrCNPJ } from '../../../commons/application/dtos/is-cpf-or-cnpj.dto';
import { IsValidArea } from '../../../commons/application/dtos/is-valid-area.dto';
import { Transform } from 'class-transformer';

export class BodyCreateProducerDTO {
  @ApiProperty({
    description: 'CPF / CNPJ of rural producer',
    type: String,
    required: true,
    example: '12345678910',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  @MinLength(11)
  @IsCPFOrCNPJ()
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
  @IsValidArea()
  total_area: number;

  @ApiProperty({
    description: 'Arable area of farm (ha)',
    type: Number,
    required: true,
    example: 30,
  })
  @IsInt()
  @Min(0)
  @Max(10000000)
  arable_area: number;

  @ApiProperty({
    description: 'Vegetation area of farm (ha)',
    type: Number,
    required: true,
    example: 20,
  })
  @IsInt()
  @Min(0)
  @Max(10000000)
  vegetation_area: number;

  @ApiProperty({
    description: 'List of plantations of farm',
    type: Array<string>,
    required: true,
    example: ['Soja', 'Milho', 'Algodão', 'Cana de açúcar'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsValidPlantationConstraint)
  plantation: string[];
}

export class CreateProducerResponseDTO {
  @ApiProperty({
    description: 'Content',
  })
  data: BodyCreateProducerDTO;

  constructor(data: BodyCreateProducerDTO) {
    this.data = data;
  }
}
