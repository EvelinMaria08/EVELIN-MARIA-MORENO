import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';



describe('PrescriptionController', () => {
    // declare controller and service
    let controller: PrescriptionController;
    let service: PrescriptionService;

    // Mock servicePrescription
    const mockPrescriptionService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PrescriptionController],
            providers: [
                PrescriptionService,
                {
                    provide: PrescriptionService,
                    useValue: mockPrescriptionService
                }
            ]
        }).compile();

        controller = module.get<PrescriptionController>(PrescriptionController);
        service = module.get<PrescriptionService>(PrescriptionService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test: create prescription
    it('should create a prescription', async () => {
        const dto: CreatePrescriptionDto = {
            date: new Date,
            observations: 'Take with food',
            quantity: 30,
            duration: 15,
            appointmentId: 1,
            medicineId: 1,
            details: []
        };

        const result = {id: 1, ...dto};
        mockPrescriptionService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });
    // Test: find all prescriptions
    it('should get all prescriptions', async () => {
        const result = [
            {
                id: 1,
                date: new Date,
                observations: 'Take with food',
                quantity: 30,
                duration: 15,
                appointmentId: 1,
                medicineId: 1,
                details: []
            },
            {
                id: 2,
                date: new Date,
                observations: 'Take with food',
                quantity: 30,
                duration: 15,
                appointmentId: 2,
                medicineId: 2,
                details: []
            }
        ];

        mockPrescriptionService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one prescription by id
    it('should get one prescription', async () => {
        const result = {
            id: 1,
            date: new Date,
            observations: 'Take with food',
            quantity: 30,
            duration: 15,
            appointmentId: 1,
            medicineId: 1,
            details: []
        };

        mockPrescriptionService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update prescription
    it('should update a prescription', async () => {
        const dto: UpdatePrescriptionDto = {
            date: new Date,
            observations: 'Take with food',
            quantity: 30,
            duration: 15,
            appointmentId: 1,
            medicineId: 1,
            details: []
        };

        const result = { ...dto };
        mockPrescriptionService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete prescription
    it('should delete a prescription', async () => {
        const result = { message: 'Prescription deleted successfully' };
        mockPrescriptionService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});