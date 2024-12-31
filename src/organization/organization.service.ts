import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const { name } = createOrganizationDto;

    // Check if organization with the same name already exists
    const existingOrganization = await this.prisma.organization.findFirst({
      where: { name },
    });

    if (existingOrganization) {
      throw new ConflictException(
        `Organization with name "${name}" already exists`,
      );
    }

    return this.prisma.organization.create({
      data: { name },
    });
  }

  async findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const { name } = updateOrganizationDto;

    if (name) {
      const existingOrganization = await this.prisma.organization.findFirst({
        where: { name },
      });
      if (existingOrganization && existingOrganization.id !== id) {
        throw new ConflictException(
          `Organization with name "${name}" already exists`,
        );
      }
    }

    return this.prisma.organization.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }
    return this.prisma.organization.delete({ where: { id } });
  }
}
