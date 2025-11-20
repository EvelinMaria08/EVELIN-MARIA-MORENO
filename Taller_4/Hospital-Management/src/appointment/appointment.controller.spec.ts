import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';



describe('appointmentController', () => {
    // declare controller and service
    let controller: AppointmentController;
    let service: AppointmentService;

    // Mock serviceAppointment
    const mockAppointmentService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppointmentController],
            providers: [
                {
                    provide: AppointmentService,
                    useValue: mockAppointmentService,
                },
            ],
        }).compile();

        controller = module.get<AppointmentController>(AppointmentController);
        service = module.get<AppointmentService>(AppointmentService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test: create appointment
    it('should create appointment', async () => {

        const dto: CreateAppointmentDto = {
            doctorId: 1,
            patientId: 1,
            date: new Date,
            reason: 'Cardiology appointment',
            notes: 'No known allergies',
            status: 'Pending',
            officeId: 1,

        };

        const result = {id: 1, ...dto};
        mockAppointmentService.create.mockResolvedValue(result);

        expect(await controller.create(dto)).toEqual(result);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    // Test: find all appointments
    it('should find all appointments', async () => {
        const result = [
            {id: 1, doctorId: 1, patientId: 1, date: new Date, reason: 'Cardiology appointment', notes: 'No known allergies', status: 'Pending', officeId: 1},
            {id: 2, doctorId: 2, patientId: 2, date: new Date, reason: 'Cardiology appointment', notes: 'No known allergies', status: 'Pending', officeId: 2},
        ];
        mockAppointmentService.findAll.mockResolvedValue(result);

        expect(await controller.findAll()).toEqual(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Test: find one appointment by id
    it('should find one appointment by id', async () => {

        const result = {id: '1', doctorId: 1, patientId: 1, date: new Date, reason: 'Cardiology appointment', notes: 'No known allergies', status: 'Pending', officeId: 1};
        mockAppointmentService.findOne.mockResolvedValue(result);

        expect(await controller.findOne(1)).toEqual(result);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    // Test: update appointment
    it('should update appointment', async () => {
        const dto: UpdateAppointmentDto = {
            patientId: 1,
            doctorId: 1,
            officeId: 1,
            date: new Date('2025-11-01'),
            reason: 'Cardiology appointment',
            status: 'Pending',
            notes: 'No known allergies',
        };

        const result = { ...dto };
        mockAppointmentService.update.mockResolvedValue(result);

        // Cambiar de 1 a '1' (string)
        expect(await controller.update(1, dto)).toEqual(result);
        expect(service.update).toHaveBeenCalledWith(1, dto); // string
    });

    // Test: delete appointment
    it('should delete appointment', async () => {
        const result = { message: 'Appointment deleted successfully' };
        mockAppointmentService.remove.mockResolvedValue(result);

        expect(await controller.remove(1)).toEqual(result);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});