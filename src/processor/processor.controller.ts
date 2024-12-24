import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ProcessorService } from './processor.service';
import { CreateProcessorDto } from './dtos/create-processor.dto';
import { UpdateProcessorDto } from './dtos/update-processor.dto';
import { ListProcessorsFilter } from './dtos/list-processors-filter.dto';

@ApiTags('Processors')
@Controller('processors')
export class ProcessorController {
  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new processor' })
  @ApiBody({ type: CreateProcessorDto })
  async create(@Body() createProcessorDto: CreateProcessorDto) {
    return this.processorService.create(createProcessorDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a processor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Processor ID' })
  async findById(@Param('id') id: string) {
    return this.processorService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'List processors' })
  @ApiQuery({
    name: 'enabled',
    required: false,
    type: Boolean,
    description: 'Filter by enabled status',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by processor name',
  })
  async list(@Query() filter: ListProcessorsFilter) {
    return this.processorService.list(filter);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a processor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Processor ID' })
  @ApiBody({ type: UpdateProcessorDto })
  async update(
    @Param('id') id: string,
    @Body() updateProcessorDto: UpdateProcessorDto,
  ) {
    return this.processorService.update(id, updateProcessorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a processor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Processor ID' })
  async delete(@Param('id') id: string) {
    return this.processorService.delete(id);
  }
}
