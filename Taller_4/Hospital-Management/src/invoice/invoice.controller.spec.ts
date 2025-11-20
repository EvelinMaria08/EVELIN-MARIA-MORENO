import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';




describe('InvoiceController', () => {
    // declare controller and service
    let controller: InvoiceController;
    let service: InvoiceService;

    // Mock serviceInvoice
    const mockInvoiceService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()
    };

    // function before each test
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InvoiceController],
            providers: [
                InvoiceService,
                {
                    provide: InvoiceService,
                    useValue: mockInvoiceService
                }
            ]
        }).compile();

        controller = module.get<InvoiceController>(InvoiceController);
        service = module.get<InvoiceService>(InvoiceService);
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    // Test: create invoice
    it('should create an invoice', async () => {
        const dto: CreateInvoiceDto = {
            id_paciente: 1,
            id_cita: 1,
            fecha: new Date(),
            total: 100,
            estado_pago: 'pagado',
            metodo_pago: 'tarjeta'
        };

        const result = {id: 1, ...dto};
        mockInvoiceService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all invoices
    it('should get all invoices', async () => {
        const result = [
            {
                id: 1,
                invoiceNumber: '123456789',
                patientId: 1,
                doctorId: 1,
                date: '2022-01-01',
                totalAmount: 100,
                status: 'paid',
                invoiceFile: 'invoice.pdf'
            },
            {
                id: 2,
                invoiceNumber: '123456789',
                patientId: 2,
                doctorId: 2,
                date: '2022-01-02',
                totalAmount: 200,
                status: 'paid',
                invoiceFile: 'invoice.pdf'
            }
        ];

        mockInvoiceService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(mockInvoiceService.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one invoice by id
    it('should get one invoice', async () => {
        const result = {
            id: 1,
            invoiceNumber: '123456789',
            patientId: 1,
            doctorId: 1,
            date: '2022-01-01',
            totalAmount: 100,
            status: 'paid',
            invoiceFile: 'invoice.pdf'
        };

        mockInvoiceService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update invoice
    it('should update an invoice', async () => {
        const dto: UpdateInvoiceDto = {
            id_paciente: 1,
            id_cita: 1,
            fecha: new Date(),
            total: 100,
            estado_pago: 'pagado',
            metodo_pago: 'tarjeta',
            id_factura: 1
        };

        const result = { ...dto };
        mockInvoiceService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete invoice
    it('should delete an invoice', async () => {
        const result = { message: 'Invoice deleted successfully' };
        mockInvoiceService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});