import { ApiProperty } from '@nestjs/swagger';
import { BodyCreateProducerDTO } from './body-create-producer.dto';
import { IsString } from 'class-validator';

export class BodyUpdateProducerDTO extends BodyCreateProducerDTO {}

export class UpdateProducerResponseDTO {
  @ApiProperty({
    description: 'Content',
  })
  data: BodyUpdateProducerDTO;

  constructor(data: BodyUpdateProducerDTO) {
    this.data = data;
  }
}
