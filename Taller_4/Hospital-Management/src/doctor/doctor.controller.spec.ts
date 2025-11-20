import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';




describe('DoctorController', () => {
    // declare controller and service
    let controller: DoctorController;
    let service: DoctorService;

    // Mock serviceDoctor
    const mockDoctorService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DoctorController],
            providers: [
                {
                    provide: DoctorService,
                    useValue: mockDoctorService,
                },
            ],
        }).compile();

        controller = module.get<DoctorController>(DoctorController);
        service = module.get<DoctorService>(DoctorService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test: create doctor
    it('should create doctor', async () => {

        const dto: CreateDoctorDto = {
            licenseNumber: '123456789',
            personaId: 1,
            specialtyId: 1,
        };

        const result = {id: 1, ...dto};
        mockDoctorService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all doctors
    it('should find all doctors', async () => {
        const result = [
            {id: 1, liceseNumber: '123456789', personaId: 1, specialtyId: 1},
            {id: 2, liceseNumber: '987654321', personaId: 2, specialtyId: 2},
        ];
        mockDoctorService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });
    
    // Test: find one doctor by id
    it('should find one doctor by id', async () => {

        const result = {id: 1, licenseNumber: '123456789'};
        mockDoctorService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update doctor
    it('should update doctor', async () => {
        const dto: UpdateDoctorDto = { licenseNumber: '123456700-Update', specialtyId: 2 };
        const result = { id: 1, ...dto };

        mockDoctorService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete doctor
    it('should delete doctor', async () => {
        const result = { message: 'Doctor deleted successfully' };
        mockDoctorService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});