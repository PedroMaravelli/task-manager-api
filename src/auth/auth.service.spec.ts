import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashed')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;
  const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a user', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 'uuid',
      email: 'test@test.com',
      password: 'hashed',
    } as any);


    const result = await service.register({ email: 'test@test.com', password: '123456' });
    expect(result).toHaveProperty('access_token');
  });

  it('should login a user', async () => {
  const user = { id: 'uuid', email: 'test@test.com', password: 'hashed' };
  jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user as any);
  jest.spyOn(bcrypt, 'compare').mockImplementation((): Promise<boolean> => Promise.resolve(true));


  const result = await service.login({ email: 'test@test.com', password: '123456' });
  expect(result).toHaveProperty('access_token');
});


  it('should throw on invalid credentials', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    await expect(service.login({ email: 'notfound@test.com', password: '123' })).rejects.toThrow();
  });
});
