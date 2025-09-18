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
exports.VacancyService = exports.VACANCY_SERVICE = void 0;
const data_source_1 = __importDefault(require("../config/data-source"));
const Vacancy_1 = require("../models/Vacancy");
const EmployerProfile_1 = require("../models/EmployerProfile");
const tsyringe_1 = require("tsyringe");
exports.VACANCY_SERVICE = Symbol('IVacancyService');
let VacancyService = class VacancyService {
    constructor() {
        this.repo = data_source_1.default.getRepository(Vacancy_1.Vacancy);
        this.employerRepo = data_source_1.default.getRepository(EmployerProfile_1.EmployerProfile);
    }
    async search(params) {
        const qb = this.repo.createQueryBuilder('v').leftJoinAndSelect('v.company', 'company');
        if (params.industry)
            qb.andWhere('v.industry = :industry', { industry: params.industry });
        if (typeof params.salaryMin === 'number')
            qb.andWhere('(v.salaryMax IS NULL OR v.salaryMax >= :salaryMin)', { salaryMin: params.salaryMin });
        if (typeof params.salaryMax === 'number')
            qb.andWhere('(v.salaryMin IS NULL OR v.salaryMin <= :salaryMax)', { salaryMax: params.salaryMax });
        if (typeof params.experienceMin === 'number')
            qb.andWhere('(v.experienceRequired IS NULL OR v.experienceRequired >= :expMin)', { expMin: params.experienceMin });
        if (typeof params.experienceMax === 'number')
            qb.andWhere('(v.experienceRequired IS NULL OR v.experienceRequired <= :expMax)', { expMax: params.experienceMax });
        qb.orderBy('v.postedDate', 'DESC');
        return qb.getMany();
    }
    async getById(id) {
        const v = await this.repo.findOne({ where: { id }, relations: { company: true } });
        if (!v)
            throw new Error(`Vacancy(${id}) not found`);
        return v;
    }
    async getEmployerProfileByUserIdOrThrow(userId) {
        const ep = await this.employerRepo.findOne({
            where: { userId },
            relations: { company: true }, // важно
        });
        if (!ep)
            throw new Error('Employer profile not found for current user');
        return ep;
    }
    async createForEmployer(userId, dto) {
        const ep = await this.getEmployerProfileByUserIdOrThrow(userId);
        const entity = this.repo.create({ company: ep.company, employerProfile: ep, title: dto.title, description: dto.description, requirements: dto.requirements, salaryMin: dto.salaryMin, salaryMax: dto.salaryMax, industry: dto.industry, experienceRequired: dto.experienceRequired, postedDate: new Date(), expireDate: dto.expireDate });
        return this.repo.save(entity);
    }
    async updateForEmployer(userId, id, dto) {
        await this.getEmployerProfileByUserIdOrThrow(userId);
        const v = await this.repo.findOne({ where: { id } });
        if (!v)
            throw new Error(`Vacancy(${id}) not found`);
        Object.assign(v, dto);
        return this.repo.save(v);
    }
    async deleteForEmployer(userId, id) {
        await this.getEmployerProfileByUserIdOrThrow(userId);
        const v = await this.repo.findOne({ where: { id } });
        if (!v)
            throw new Error(`Vacancy(${id}) not found`);
        await this.repo.remove(v);
    }
};
exports.VacancyService = VacancyService;
exports.VacancyService = VacancyService = __decorate([
    (0, tsyringe_1.singleton)()
], VacancyService);
