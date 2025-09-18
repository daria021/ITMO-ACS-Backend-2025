"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vacancy = void 0;
const typeorm_1 = require("typeorm");
const Company_1 = require("./Company");
const EmployerProfile_1 = require("./EmployerProfile");
const enums_1 = require("../common/enums");
let Vacancy = class Vacancy {
};
exports.Vacancy = Vacancy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vacancy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Vacancy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Vacancy.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", Company_1.Company)
], Vacancy.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployerProfile_1.EmployerProfile, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'employer_profile_id' }),
    __metadata("design:type", EmployerProfile_1.EmployerProfile)
], Vacancy.prototype, "employerProfile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vacancy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Vacancy.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vacancy.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_min', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], Vacancy.prototype, "salaryMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_max', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], Vacancy.prototype, "salaryMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Industry, enumName: 'industry', default: enums_1.Industry.Other }),
    __metadata("design:type", String)
], Vacancy.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'experience_required', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Vacancy.prototype, "experienceRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'posted_date', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Vacancy.prototype, "postedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expire_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Vacancy.prototype, "expireDate", void 0);
exports.Vacancy = Vacancy = __decorate([
    (0, typeorm_1.Entity)({ name: 'vacancies' })
], Vacancy);
