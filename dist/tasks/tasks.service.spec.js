"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tasks_service_1 = require("./tasks.service");
const prisma_service_1 = require("../prisma.service");
describe('TasksService', () => {
    let service;
    let prisma;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [tasks_service_1.TasksService, prisma_service_1.PrismaService],
        }).compile();
        service = module.get(tasks_service_1.TasksService);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    it('should create a task', async () => {
        jest.spyOn(prisma.task, 'create').mockResolvedValue({ id: 'uuid', title: 'Test', description: 'desc', status: 'PENDING', userId: 'user-id' });
        const result = await service.create('user-id', { title: 'Test', description: 'desc' });
        expect(result).toHaveProperty('id');
    });
    it('should find all tasks for user', async () => {
        jest.spyOn(prisma.task, 'findMany').mockResolvedValue([{ id: 'uuid', userId: 'user-id' }]);
        const result = await service.findAll('user-id');
        expect(result.length).toBeGreaterThan(0);
    });
    it('should update a task', async () => {
        jest.spyOn(prisma.task, 'findFirst').mockResolvedValue({ id: 'uuid', userId: 'user-id' });
        jest.spyOn(prisma.task, 'update').mockResolvedValue({ id: 'uuid', title: 'Updated' });
        const result = await service.update('user-id', 'uuid', { title: 'Updated' });
        expect(result.title).toBe('Updated');
    });
    it('should delete a task', async () => {
        jest.spyOn(prisma.task, 'findFirst').mockResolvedValue({ id: 'uuid', userId: 'user-id' });
        jest.spyOn(prisma.task, 'delete').mockResolvedValue({ id: 'uuid' });
        const result = await service.remove('user-id', 'uuid');
        expect(result).toHaveProperty('id');
    });
});
