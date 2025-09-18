"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerService = exports.EMPLOYER_SERVICE = void 0;
const data_source_1 = __importDefault(require("../config/data-source"));
const EmployerProfile_1 = require("../models/EmployerProfile");
const Company_1 = require("../models/Company");
const tsyringe_1 = require("tsyringe");
const messaging_1 = require("../messaging");
exports.EMPLOYER_SERVICE = Symbol('IEmployerService');
let EmployerService = class EmployerService {
    constructor() {
        this.repo = data_source_1.default.getRepository(EmployerProfile_1.EmployerProfile);
        this.companyRepo = data_source_1.default.getRepository(Company_1.Company);
    }
    async getMy(userId) {
        return this.repo.createQueryBuilder('e')
            .leftJoinAndSelect('e.company', 'c')
            .where('e.userId = :uid', { uid: userId })
            .getOne();
    }
    async createForUser(userId, dto) {
        const company = await this.companyRepo.findOne({ where: { id: dto.companyId } });
        if (!company) {
            throw new Error('Company not found');
        }
        const entity = this.repo.create({ company, phone: dto.phone, userId });
        const saved = await this.repo.save(entity);
        try {
            await messaging_1.broker.publish(messaging_1.QUEUES.EMPLOYER_PROFILE_CREATED, {
                userId,
                companyId: company.id,
                phone: dto.phone,
            });
            console.log(`[vacancies-service] Published employer.profile.created for ${userId}`);
        }
        catch (err) {
            console.error('[vacancies-service] Failed to publish employer.profile.created event', err);
        }
        return saved;
    }
};
exports.EmployerService = EmployerService;
exports.EmployerService = EmployerService = __decorate([
    (0, tsyringe_1.singleton)()
], EmployerService);
