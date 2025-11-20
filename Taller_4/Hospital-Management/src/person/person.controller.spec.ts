import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Role } from './person.entity';
import { UpdatePersonDto } from './dto/update-person.dto';




describe('PersonController', () => {
    let controller: PersonController;
    let service: PersonService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        findByrole: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PersonController],
            providers: [
                {
                    provide: PersonService,
                    useValue: mockService,
                }
            ],        
        }).compile();

        controller = module.get<PersonController>(PersonController);
        service = module.get<PersonService>(PersonService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Creat a new person
    it ('should create a new person', async () => {
        const dto: CreatePersonDto = {
            name: 'John',
            lastname: 'Doe',
            document: '123456789',
            email: 'john@example.com',
            phone: '555-1234',
            birthDate: new Date('1990-01-01'),
            password: 'securePassword123',
            role: Role.Admin,
            gender: 'male',

        };
        const result = { id: 1, ...dto };
        mockService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });
    // Get all people
    it ('should return all people', async () => {
        const result = [
            { id: 1, name: 'John', lastname: 'Doe' },
            { id: 2, name: 'Jane', lastname: 'Doe' },
        ];
        mockService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });
    // Get person by id
    it ('should return a person by id', async () => {
        const result = { id: 1, name: 'John', lastname: 'Doe' };
        mockService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });
    // Update person by id
    it ('should update a person', async () => {
        const dto = { phone: '555-5678' } as UpdatePersonDto;
        const result = { id: 1, name: 'John', lastname: 'Doe', phone: '555-5678' };
        mockService.update.mockResolvedValue(result);

        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });
    // Delete person by id
    it ('should delete a person', async () => {
        const result = { message: 'Person deleted successfully' };
        mockService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
    // Get person by role
    it ('should return a person by role', async () => {
        const result = [
            { id: 1, name: 'John', lastname: 'Doe', role: Role.Admin },
            { id: 2, name: 'Jane', lastname: 'Doe', role: Role.Doctor },
        ];
        mockService.findByrole.mockResolvedValue(result);

        expect(await controller.findByRole(Role.Admin)).toEqual(result);
        expect(service.findByrole).toHaveBeenCalledWith(Role.Admin);
    });
});