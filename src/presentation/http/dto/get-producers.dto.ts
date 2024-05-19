import { IsOptional, IsString } from 'class-validator';
import { RequestPaginateDTO } from '../../../commons/application/dtos/paginate.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProducersParamsDTO extends RequestPaginateDTO {
  @ApiPropertyOptional({
    description: 'City of producer',
    type: String,
    example: 'Santos',
  })
  @IsOptional()
  @IsString()
  city?: string | null;

  @ApiPropertyOptional({
    description: 'State of producer',
    type: String,
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  state?: string | null;
}
