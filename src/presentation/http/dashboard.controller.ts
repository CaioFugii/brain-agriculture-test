import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetStatsUseCase } from '../../usecases/get-stats-dashboard.usecase';

@Controller('/dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);
  constructor(private readonly getStatsUseCase: GetStatsUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get data to dashboard' })
  async get() {
    try {
      this.logger.log(`Trying to get data to dashboard`);
      await this.getStatsUseCase.execute();

      this.logger.log('Successfully retrieved');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
