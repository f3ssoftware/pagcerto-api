import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProcessorDto } from './dtos/create-processor.dto';
import { ListProcessorsFilter } from './dtos/list-processors-filter.dto';
import { UpdateProcessorDto } from './dtos/update-processor.dto';

@Injectable()
export class ProcessorService {
  constructor(private prisma: PrismaService) {}

  async create(processorDto: CreateProcessorDto) {
    return this.prisma.processor.create({
      data: {
        name: processorDto?.name,
        enabled: processorDto?.enabled,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.processor.findUnique({
      where: {
        id,
      },
    });
  }

  async list(filter: ListProcessorsFilter) {
    const { enabled, name } = filter;
    return this.prisma.processor.findMany({
      where: {
        enabled,
        name,
      },
    });
  }

  async update(id: string, dto: UpdateProcessorDto) {
    const { name, enabled } = dto;
    return this.prisma.processor.update({
      data: {
        enabled,
        name,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.processor.delete({
      where: {
        id,
      },
    });
  }
}
