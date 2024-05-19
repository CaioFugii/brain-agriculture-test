import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

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
    example: {
      id: '874cf522-223f-42a9-9e4f-c8345c39a647',
      document: '12345678910',
      producer_name: 'Tonic Milho producer',
      farm_name: 'Milharal farm',
      city: 'Campinas',
      state: 'São Paulo',
      total_area: 50,
      arable_area: 30,
      vegetation_area: 20,
      plantation: ['Soja', 'Milho', 'Algodão', 'Cana de açúcar'],
    },
  })
  data: ProducerDTO;

  constructor(data: ProducerDTO) {
    this.data = data;
  }
}

export class GetListProducersResponseDTO {
  @ApiProperty({
    description: 'Content',
    example: [
      {
        id: '874cf522-223f-42a9-9e4f-c8345c39a647',
        document: '12345678910',
        producer_name: 'Tonic Milho producer',
        farm_name: 'Milharal farm',
        city: 'Campinas',
        state: 'São Paulo',
        total_area: 50,
        arable_area: 30,
        vegetation_area: 20,
        plantation: ['Soja', 'Milho', 'Algodão', 'Cana de açúcar'],
      },
    ],
  })
  data: ProducerDTO[];

  @ApiProperty({
    description: 'Total number of pages',
    example: 1,
  })
  @IsNumber()
  total_pages: number;

  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  @IsNumber()
  page_number: number;

  @ApiProperty({
    description: 'Pagination size',
    example: 10,
  })
  @IsNumber()
  page_size: number;

  constructor(
    data: ProducerDTO[],
    totalElements: number,
    pageNumber: number,
    pageSize: number,
  ) {
    const totalPages = Math.ceil(totalElements / pageSize);
    this.data = data;
    this.total_pages = totalPages;
    this.page_number = pageNumber;
    this.page_size = pageSize;
  }
}
