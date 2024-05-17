import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/producer')
@ApiTags('Producer')
export class ProducerController {
  constructor() {}

  @Post()
  create() {}

  @Put('/:id')
  update() {}

  @Get()
  get() {}

  @Get('/:id')
  getById() {}

  @Delete('/:id')
  delete() {}
}
