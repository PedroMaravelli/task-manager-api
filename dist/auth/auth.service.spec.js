"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
jest.mock('bcrypt', () => ({
    hash: jest.fn(() => Promise.resolve('hashed')),
    compare: jest.fn(() => Promise.resolve(true)),
}));
describe('AuthService', () => {
    let service;
    let prisma;
    let jwtService;
    const bcryptMock = bcrypt;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                prisma_service_1.PrismaService,
                {
                    provide: jwt_1.JwtService,
                    useValue: { sign: jest.fn().mockReturnValue('token') },
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        prisma = module.get(prisma_service_1.PrismaService);
        jwtService = module.get(jwt_1.JwtService);
    });
    it('should register a user', async () => {
        jest.spyOn(prisma.user, 'create').mockResolvedValue({
            id: 'uuid',
            email: 'test@test.com',
            password: 'hashed',
        });
        const result = await service.register({ email: 'test@test.com', password: '123456' });
        expect(result).toHaveProperty('access_token');
    });
    it('should login a user', async () => {
        const user = { id: 'uuid', email: 'test@test.com', password: 'hashed' };
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        const result = await service.login({ email: 'test@test.com', password: '123456' });
        expect(result).toHaveProperty('access_token');
    });
    it('should throw on invalid credentials', async () => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
        await expect(service.login({ email: 'notfound@test.com', password: '123' })).rejects.toThrow();
    });
});
