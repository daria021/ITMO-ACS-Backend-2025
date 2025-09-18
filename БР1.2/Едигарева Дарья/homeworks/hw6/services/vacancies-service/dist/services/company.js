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
exports.CompanyService = exports.COMPANY_SERVICE = void 0;
const data_source_1 = __importDefault(require("../config/data-source"));
const Company_1 = require("../models/Company");
const tsyringe_1 = require("tsyringe");
exports.COMPANY_SERVICE = Symbol('ICompanyService');
let CompanyService = class CompanyService {
    constructor() {
        this.repo = data_source_1.default.getRepository(Company_1.Company);
    }
    async list() { return this.repo.find(); }
    async getById(id) {
        const c = await this.repo.findOne({ where: { id } });
        if (!c)
            throw new Error('Company not found');
        return c;
    }
    async create(dto) {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }
    async update(id, dto) {
        const c = await this.getById(id);
        Object.assign(c, dto);
        return this.repo.save(c);
    }
    async remove(id) { await this.repo.delete(id); }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, tsyringe_1.singleton)()
], CompanyService);
