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
exports.EmployerController = void 0;
const tsoa_1 = require("tsoa");
const employer_1 = require("../services/employer");
const tsyringe_1 = require("tsyringe");
let EmployerController = class EmployerController extends tsoa_1.Controller {
    constructor(service) {
        super();
        this.service = service;
    }
    async get(req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const p = await this.service.getMy(user.id);
        if (!p) {
            this.setStatus(404);
            throw new Error('Employer profile not found');
        }
        return p;
    }
    async create(dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const p = await this.service.createForUser(user.id, dto);
        this.setStatus(201);
        return p;
    }
};
exports.EmployerController = EmployerController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "get", null);
__decorate([
    (0, tsoa_1.Post)(),
    (0, tsoa_1.SuccessResponse)('201'),
    (0, tsoa_1.Response)(400, 'Bad Request'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "create", null);
exports.EmployerController = EmployerController = __decorate([
    (0, tsoa_1.Route)('me/employer'),
    (0, tsoa_1.Tags)('Employer'),
    (0, tsoa_1.Security)('bearerAuth'),
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(employer_1.EMPLOYER_SERVICE)),
    __metadata("design:paramtypes", [Object])
], EmployerController);
