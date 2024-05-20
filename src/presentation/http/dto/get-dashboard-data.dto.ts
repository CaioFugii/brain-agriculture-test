import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StateCount {
  @ApiProperty({ example: 'Paraná' })
  @IsString()
  state: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  count: number;
}

class LandUse {
  @ApiProperty({ example: 'Arable Area' })
  @IsString()
  land_usage: string;

  @ApiProperty({ example: 280 })
  @IsInt()
  total_area: number;
}

class Plantation {
  @ApiProperty({ example: 'Soja' })
  @IsString()
  plantation: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  count: number;
}

export class GetDashboardDataDTO {
  @ApiProperty({ example: 7 })
  @IsInt()
  totalAreaCount: number;

  @ApiProperty({ example: 420 })
  @IsInt()
  totalAreaCountHectares: number;

  @ApiProperty({ type: [StateCount] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StateCount)
  pieChartByState: StateCount[];

  @ApiProperty({ type: [LandUse] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LandUse)
  pieChartByLandUse: LandUse[];

  @ApiProperty({ type: [Plantation] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Plantation)
  pieChartByPlantation: Plantation[];
}
