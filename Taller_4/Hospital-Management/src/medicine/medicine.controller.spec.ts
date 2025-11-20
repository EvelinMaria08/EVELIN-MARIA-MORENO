import { Test, TestingModule } from '@nestjs/testing';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';



describe('MedicineController', () => {
    // declare controller and service
    let controller: MedicineController;
    let service: MedicineService;

    // Mock serviceMedicine
    const mockMedicineService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()
    };

    // function before each test
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MedicineController],
            providers: [
                MedicineService,
                {
                    provide: MedicineService,
                    useValue: mockMedicineService
                }
            ]
        }).compile();

        controller = module.get<MedicineController>(MedicineController);
        service = module.get<MedicineService>(MedicineService);
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    // Test: create medicine
    it('should create a medicine', async () => {
        const dto: CreateMedicineDto = {
            
            name: 'Medicine name',
            type: 'Medicine type',
            presentation: 'Medicine presentation',
            stock: 10,
            description: 'Medicine description',
            price: 100,
            
        };
        const result = {id: 1, ...dto};
        mockMedicineService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all medicines
    it('should get all medicines', async () => {
        const result = [
            {
                id: 1,
                name: 'Medicine name',
                type: 'Medicine type',
                presentation: 'Medicine presentation',
                stock: 10,
                description: 'Medicine description',
                price: 100
            },
            {
                id: 2,
                name: 'Medicine name',
                type: 'Medicine type',
                presentation: 'Medicine presentation',
                stock: 20,
                description: 'Medicine description',
                price: 200
            }
        ];

        mockMedicineService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(mockMedicineService.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one medicine by id
    it('should get one medicine', async () => {
        const result = {
            id: 1,
            name: 'Medicine name',
            type: 'Medicine type',
            presentation: 'Medicine presentation',
            stock: 10,
            description: 'Medicine description',
            price: 100
        };

        mockMedicineService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update medicine
    it('should update a medicine', async () => {
        const dto: UpdateMedicineDto = {
            id: 1,
            name: 'Medicine name',
            type: 'Medicine type',
            presentation: 'Medicine presentation',
            stock: 10,
            description: 'Medicine description',
            price: 100,
        };

        const result = { ...dto };
        mockMedicineService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    // Test: delete medicine
    it('should delete a medicine', async () => {
        const result = { message: 'Medicine deleted successfully' };
        mockMedicineService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});