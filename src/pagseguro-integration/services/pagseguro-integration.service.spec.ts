import { Test, TestingModule } from '@nestjs/testing';
import { PagseguroIntegrationService } from './pagseguro-integration.service';
import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import { PagseguroCreateOrderPixDto } from '../dto/pagseguro-create-order-pix.dto';
import { PagseguroCreateOrderCreditCardDto } from '../dto/pagseguro-create-order-creditcard.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PagseguroIntegrationService', () => {
  let service: PagseguroIntegrationService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagseguroIntegrationService],
    }).compile();

    service = module.get<PagseguroIntegrationService>(
      PagseguroIntegrationService,
    );
    logger = new Logger(PagseguroIntegrationService.name);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPixOrder', () => {
    it('should create a Pix order successfully', async () => {
      const dto: PagseguroCreateOrderPixDto = {
        customer: {
          name: 'Jhonny B Good',
          email: 'jh0nnyb,good@f3ssoftware.com',
          phones: [
            {
              area: '61',
              country: 'BR',
              number: '99999999',
              type: 'mobile',
            },
          ],
          tax_id: '',
        },
        qr_codes: [
          {
            amount: {
              value: 100,
            },
            expiration_date: '2024-12-25',
          },
        ],
        items: [
          {
            name: 'Month Signature Bernibot',
            quantity: 1,
            unit_amount: 50,
            reference_id: '1',
          },
        ],
        notification_urls: ['https://api.chatbot.f3ssoftware.com'],
        reference_id: '1',
        shipping: {
          address: {
            city: 'Guaruja',
            complement: '',
            country: 'Brazil',
            locality: 'Praia da Enseada',
            number: '144',
            postal_code: '11440050',
            region_code: '13',
            street: 'R. Marivaldo Fernandes',
          },
        },
      };
      const mockResponse = { data: { id: '1234' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await service.createPixOrder(dto);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.PAGBANK_API_URL}/orders`,
        dto,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAGBANK_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should handle errors when creating a Pix order', async () => {
      const dto: PagseguroCreateOrderPixDto = {};
      const mockError = {
        response: {
          status: 400,
          data: 'Invalid data',
        },
      };
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(service.createPixOrder(dto)).rejects.toThrow(
        new HttpException('Invalid data', 400),
      );
    });
  });

  describe('createCreditCardOrder', () => {
    it('should create a Credit Card order successfully', async () => {
      const dto: PagseguroCreateOrderCreditCardDto = {
        /* populate with valid data */
      };
      const mockResponse = { data: { id: '5678' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await service.createCreditCardOrder(dto);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.PAGBANK_API_URL}/orders`,
        dto,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAGBANK_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should handle errors when creating a Credit Card order', async () => {
      const dto: PagseguroCreateOrderCreditCardDto = {
        /* populate with valid data */
      };
      const mockError = {
        response: {
          status: 500,
          data: 'Internal Server Error',
        },
      };
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(service.createCreditCardOrder(dto)).rejects.toThrow(
        new HttpException('Internal Server Error', 500),
      );
    });
  });

  describe('checkOrderStatus', () => {
    it('should check the order status successfully', async () => {
      const referenceId = '1234';
      const mockResponse = { data: { status: 'COMPLETED' } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await service.checkOrderStatus(referenceId);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.PAGBANK_API_URL}/orders/${referenceId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAGBANK_API_TOKEN}`,
          },
        },
      );
    });

    it('should handle errors when checking the order status', async () => {
      const referenceId = '5678';
      const mockError = {
        response: {
          status: 404,
          data: 'Order not found',
        },
      };
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(service.checkOrderStatus(referenceId)).rejects.toThrow(
        new HttpException('Order not found', 404),
      );
    });
  });
});
