import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a task', async () => {
    jest.spyOn(prisma.task, 'create').mockResolvedValue({ id: 'uuid', title: 'Test', description: 'desc', status: 'PENDING', userId: 'user-id' } as any);

    const result = await service.create('user-id', { title: 'Test', description: 'desc' });
    expect(result).toHaveProperty('id');
  });

  it('should find all tasks for user', async () => {
    jest.spyOn(prisma.task, 'findMany').mockResolvedValue([{ id: 'uuid', userId: 'user-id' }] as any);

    const result = await service.findAll('user-id');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should update a task', async () => {
    jest.spyOn(prisma.task, 'findFirst').mockResolvedValue({ id: 'uuid', userId: 'user-id' } as any);
    jest.spyOn(prisma.task, 'update').mockResolvedValue({ id: 'uuid', title: 'Updated' } as any);

    const result = await service.update('user-id', 'uuid', { title: 'Updated' });
    expect(result.title).toBe('Updated');
  });

  it('should delete a task', async () => {
    jest.spyOn(prisma.task, 'findFirst').mockResolvedValue({ id: 'uuid', userId: 'user-id' } as any);
    jest.spyOn(prisma.task, 'delete').mockResolvedValue({ id: 'uuid' } as any);

    const result = await service.remove('user-id', 'uuid');
    expect(result).toHaveProperty('id');
  });
});
