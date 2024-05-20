import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetStatsUseCase } from '../../usecases/get-stats-dashboard.usecase';
import { GetDashboardDataDTO } from './dto/get-dashboard-data.dto';

@Controller('/dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);
  constructor(private readonly getStatsUseCase: GetStatsUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get data to dashboard' })
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: GetDashboardDataDTO,
  })
  async get() {
    try {
      this.logger.log(`Trying to get data to dashboard`);
      const result = await this.getStatsUseCase.execute();
      this.logger.log('Successfully retrieved');
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
