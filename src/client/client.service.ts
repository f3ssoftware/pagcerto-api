import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  private async hashSecret(secret: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return bcrypt.hash(secret, saltRounds);
  }

  async create(createClientDto: CreateClientDto) {
    const { slug, secret, organizationId } = createClientDto;

    const existingClient = await this.prisma.client.findFirst({
      where: { slug, organizationId },
    });
    if (existingClient) {
      throw new ConflictException(`Client with slug "${slug}" already exists`);
    }

    const hashedSecret = await this.hashSecret(secret);
    return this.prisma.client.create({
      data: {
        slug,
        secret: hashedSecret,
        organizationId,
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const { slug, secret, organizationId } = updateClientDto;

    // Check if slug is being updated and already exists
    if (slug) {
      const existingClient = await this.prisma.client.findFirst({
        where: { slug },
      });
      if (existingClient && existingClient.id !== id) {
        throw new ConflictException(
          `Client with slug "${slug}" already exists`,
        );
      }
    }

    const data: any = { slug, organizationId };
    if (secret) {
      data.secret = await this.hashSecret(secret);
    }

    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return this.prisma.client.delete({ where: { id } });
  }

  async validateClient(slug: string, secret: string): Promise<boolean> {
    const client = await this.prisma.client.findFirst({ where: { slug } });
    if (!client) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(secret, client.secret);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return true;
  }
}
