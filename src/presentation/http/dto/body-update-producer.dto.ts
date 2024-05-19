import { ApiProperty } from '@nestjs/swagger';
import { BodyCreateProducerDTO } from './body-create-producer.dto';
import { IsString } from 'class-validator';

export class BodyUpdateProducerDTO extends BodyCreateProducerDTO {
  @ApiProperty({
    description: 'Id of producer to update',
    type: String,
    required: true,
    example: '874cf522-223f-42a9-9e4f-c8345c39a647',
  })
  @IsString()
  id: string;
}

export class UpdateProducerResponseDTO {
  @ApiProperty({
    description: 'Content',
  })
  data: BodyUpdateProducerDTO;

  constructor(data: BodyUpdateProducerDTO) {
    this.data = data;
  }
}
