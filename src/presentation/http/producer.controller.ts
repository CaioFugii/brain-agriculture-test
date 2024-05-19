import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BodyCreateProducerDTO,
  CreateProducerResponseDTO,
} from './dto/body-create-producer.dto';
import {
  BodyUpdateProducerDTO,
  UpdateProducerResponseDTO,
} from './dto/body-update-producer.dto';
import { CreateProducerUseCase } from '../../usecases/create-producer.usecase';
import { UpdateProducerUseCase } from '../../usecases/update-producer.usecase';
import { GetByIdProducerUseCase } from '../../usecases/get-by-id-producer.usecase';
import {
  GetListProducersResponseDTO,
  GetProducerResponseDTO,
} from './dto/get-producer-response.dto';
import { DeleteProducerUseCase } from '../../usecases/delete-producer.usecase';
import { GetProducersParamsDTO } from './dto/get-producers.dto';
import { GetProducersUseCase } from '../../usecases/get-producers.usecase';

@Controller('/producer')
@ApiTags('Producer')
export class ProducerController {
  private readonly logger = new Logger(ProducerController.name);
  constructor(
    private readonly createProducerUseCase: CreateProducerUseCase,
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    private readonly getByIdProducerUseCase: GetByIdProducerUseCase,
    private readonly getProducersUseCase: GetProducersUseCase,
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Producer' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateProducerResponseDTO,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() input: BodyCreateProducerDTO,
  ): Promise<CreateProducerResponseDTO> {
    try {
      this.logger.log(
        `Trying to create a new Producer: ${JSON.stringify(input)}`,
      );
      const result = await this.createProducerUseCase.execute(input);
      this.logger.log('Successfully created');
      return new CreateProducerResponseDTO(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an exists Producer' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: UpdateProducerResponseDTO,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  async update(
    @Body() input: BodyUpdateProducerDTO,
    @Param('id') id: string,
  ): Promise<UpdateProducerResponseDTO> {
    try {
      this.logger.log(
        `Trying to update an exists Producer: ${JSON.stringify(input)}, ID: ${id}`,
      );
      const result = await this.updateProducerUseCase.execute({ ...input, id });
      this.logger.log('Successfully updated');
      return new UpdateProducerResponseDTO(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an exists Producer' })
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: GetProducerResponseDTO,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Entity Not found' })
  async getById(@Param('id') id: string) {
    try {
      this.logger.log(`Trying to get Producer with ID: ${id}`);
      const result = await this.getByIdProducerUseCase.execute(id);
      this.logger.log('Successfully retrieved');
      return new GetProducerResponseDTO(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Producers' })
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: GetListProducersResponseDTO,
  })
  async get(
    @Query(new ValidationPipe({ transform: true }))
    params: GetProducersParamsDTO,
  ) {
    try {
      this.logger.log(`Trying to get list of Producers`);
      const [result, count] = await this.getProducersUseCase.execute(params);

      this.logger.log('Successfully retrieved');
      return new GetListProducersResponseDTO(
        result,
        count,
        params.pageNumber ?? 1,
        params.pageSize ?? 10,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an exists Producer' })
  @ApiNoContentResponse({
    status: 204,
    description: 'Entity successfully deleted',
  })
  async delete(@Param('id') id: string) {
    try {
      this.logger.log(`Trying to delete Producer with ID: ${id}`);
      await this.deleteProducerUseCase.execute(id);
      this.logger.log('Successfully deleted');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
