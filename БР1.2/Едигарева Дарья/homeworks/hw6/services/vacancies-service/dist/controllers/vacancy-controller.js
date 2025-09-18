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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyController = void 0;
const tsoa_1 = require("tsoa");
const vacancy_1 = require("../services/vacancy");
const enums_1 = require("../common/enums");
const tsyringe_1 = require("tsyringe");
let VacancyController = class VacancyController extends tsoa_1.Controller {
    constructor(service) {
        super();
        this.service = service;
    }
    async search(industry, salaryMin, salaryMax, experienceMin, experienceMax) {
        const params = { industry, salaryMin, salaryMax, experienceMin, experienceMax };
        return this.service.search(params);
    }
    async detail(id) { return this.service.getById(id); }
    async create(dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const v = await this.service.createForEmployer(user.id, dto);
        this.setStatus(201);
        return v;
    }
    async update(id, dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        return this.service.updateForEmployer(user.id, id, dto);
    }
    async remove(id, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        await this.service.deleteForEmployer(user.id, id);
        this.setStatus(204);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "search", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "detail", null);
__decorate([
    (0, tsoa_1.Security)('bearerAuth'),
    (0, tsoa_1.Post)(),
    (0, tsoa_1.SuccessResponse)('201'),
    (0, tsoa_1.Response)(403, 'Forbidden'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Security)('bearerAuth'),
    (0, tsoa_1.Patch)('{id}'),
    (0, tsoa_1.Response)(403, 'Forbidden'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Security)('bearerAuth'),
    (0, tsoa_1.Delete)('{id}'),
    (0, tsoa_1.SuccessResponse)('204'),
    (0, tsoa_1.Response)(403, 'Forbidden'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "remove", null);
exports.VacancyController = VacancyController = __decorate([
    (0, tsoa_1.Route)('vacancies'),
    (0, tsoa_1.Tags)('Vacancy'),
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(vacancy_1.VACANCY_SERVICE)),
    __metadata("design:paramtypes", [Object])
], VacancyController);
