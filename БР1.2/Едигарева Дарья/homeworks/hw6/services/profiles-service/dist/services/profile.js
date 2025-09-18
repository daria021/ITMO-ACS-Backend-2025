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
exports.ProfileService = exports.PROFILE_SERVICE = void 0;
const data_source_1 = __importDefault(require("../config/data-source"));
const JobSeekerProfile_1 = require("../models/JobSeekerProfile");
const tsyringe_1 = require("tsyringe");
exports.PROFILE_SERVICE = Symbol('IProfileService');
let ProfileService = class ProfileService {
    constructor() {
        this.repo = data_source_1.default.getRepository(JobSeekerProfile_1.JobSeekerProfile);
    }
    async getMy(userId) {
        return this.repo.findOne({ where: { userId } });
    }
    async createForUser(userId, dto) {
        const existing = await this.getMy(userId);
        if (existing) {
            throw new Error('Profile already exists');
        }
        const entity = this.repo.create({ userId, fullName: dto.fullName });
        return this.repo.save(entity);
    }
    async updateMy(userId, dto) {
        const p = await this.getMy(userId);
        if (!p) {
            throw new Error('Profile not found');
        }
        if (dto.fullName !== undefined)
            p.fullName = dto.fullName;
        return this.repo.save(p);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, tsyringe_1.singleton)()
], ProfileService);
