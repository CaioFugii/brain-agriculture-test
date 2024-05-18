import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BodyCreateProducerDTO } from './dto/body-create-producer.dto';

@Controller('/producer')
@ApiTags('Producer')
export class ProducerController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Create a new Producer' })
  create(@Body() input: BodyCreateProducerDTO) {
    return {
      message: 'O array contém apenas valores válidos.',
      data: input,
    };
  }

  @Put('/:id')
  update() {}

  @Get()
  get() {}

  @Get('/:id')
  getById() {}

  @Delete('/:id')
  delete() {}
}
