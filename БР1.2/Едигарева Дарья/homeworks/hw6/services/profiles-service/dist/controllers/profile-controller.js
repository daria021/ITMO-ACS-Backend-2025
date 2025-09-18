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
exports.ProfileController = void 0;
const tsoa_1 = require("tsoa");
const profile_1 = require("../services/profile");
const tsyringe_1 = require("tsyringe");
let ProfileController = class ProfileController extends tsoa_1.Controller {
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
            throw new Error('Profile not found');
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
    async update(dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        return this.service.updateMy(user.id, dto);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "get", null);
__decorate([
    (0, tsoa_1.Post)(),
    (0, tsoa_1.SuccessResponse)('201'),
    (0, tsoa_1.Response)(400, 'Bad Request'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "update", null);
exports.ProfileController = ProfileController = __decorate([
    (0, tsoa_1.Route)('me/profile'),
    (0, tsoa_1.Tags)('Profile'),
    (0, tsoa_1.Security)('bearerAuth'),
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(profile_1.PROFILE_SERVICE)),
    __metadata("design:paramtypes", [Object])
], ProfileController);
