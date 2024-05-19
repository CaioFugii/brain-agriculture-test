import { ApiProperty } from '@nestjs/swagger';

class ProducerDTO {
  @ApiProperty({
    description: 'Id of producer to update',
    type: String,
    required: true,
    example: '874cf522-223f-42a9-9e4f-c8345c39a647',
  })
  id: string;

  @ApiProperty({
    description: 'CPF / CNPJ of rural producer',
    type: String,
    required: true,
    example: '12345678910',
  })
  document: string;

  @ApiProperty({
    description: 'Producer Name',
    type: String,
    required: true,
    example: 'Tonic Milho producer',
  })
  producer_name: string;

  @ApiProperty({
    description: 'Farm Name',
    type: String,
    required: true,
    example: 'Milharal farm',
  })
  farm_name: string;

  @ApiProperty({
    description: 'City name',
    type: String,
    required: true,
    example: 'Campinas',
  })
  city: string;

  @ApiProperty({
    description: 'State name',
    type: String,
    required: true,
    example: 'São Paulo',
  })
  state: string;

  @ApiProperty({
    description: 'Total area of farm (ha)',
    type: Number,
    required: true,
    example: 50,
  })
  total_area: number;

  @ApiProperty({
    description: 'Arable area of farm (ha)',
    type: Number,
    required: true,
    example: 30,
  })
  arable_area: number;

  @ApiProperty({
    description: 'Vegetation area of farm (ha)',
    type: Number,
    required: true,
    example: 20,
  })
  vegetation_area: number;

  @ApiProperty({
    description: 'List of plantations of farm',
    type: Array<string>,
    required: true,
    example: ['Soja', 'Milho', 'Algodão', 'Cana de açúcar'],
  })
  plantation: string[];
}

export class GetProducerResponseDTO {
  @ApiProperty({
    description: 'Content',
  })
  data: ProducerDTO;

  constructor(data: ProducerDTO) {
    this.data = data;
  }
}
