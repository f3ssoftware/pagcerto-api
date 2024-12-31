import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CostCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCostCenterDto: CreateCostCenterDto) {
    const { name, organizationId } = createCostCenterDto;

    // Check if cost center with the same name and organization already exists
    const existingCostCenter = await this.prisma.costCenter.findFirst({
      where: { name, organizationId },
    });
    if (existingCostCenter) {
      throw new ConflictException(
        `Cost center with name "${name}" already exists for this organization.`,
      );
    }

    return this.prisma.costCenter.create({
      data: { name, organizationId },
    });
  }

  async findAll() {
    return this.prisma.costCenter.findMany();
  }

  async findOne(id: string) {
    const costCenter = await this.prisma.costCenter.findUnique({
      where: { id },
    });
    if (!costCenter) {
      throw new NotFoundException(`Cost center with ID "${id}" not found.`);
    }
    return costCenter;
  }

  async update(id: string, updateCostCenterDto: UpdateCostCenterDto) {
    const { name, organizationId } = updateCostCenterDto;

    // Check if cost center name already exists within the same organization
    if (name && organizationId) {
      const existingCostCenter = await this.prisma.costCenter.findFirst({
        where: { name, organizationId, NOT: { id } },
      });
      if (existingCostCenter) {
        throw new ConflictException(
          `Cost center with name "${name}" already exists for this organization.`,
        );
      }
    }

    return this.prisma.costCenter.update({
      where: { id },
      data: { name, organizationId },
    });
  }

  async remove(id: string) {
    const costCenter = await this.prisma.costCenter.findUnique({
      where: { id },
    });
    if (!costCenter) {
      throw new NotFoundException(`Cost center with ID "${id}" not found.`);
    }
    return this.prisma.costCenter.delete({ where: { id } });
  }
}
