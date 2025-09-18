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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = __importDefault(require("../config/data-source"));
const Resume_1 = require("../models/Resume");
const WorkExperience_1 = require("../models/WorkExperience");
const Education_1 = require("../models/Education");
const JobSeekerProfile_1 = require("../models/JobSeekerProfile");
const messaging_1 = require("../messaging");
let ResumeController = class ResumeController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.resumes = data_source_1.default.getRepository(Resume_1.Resume);
        this.experiences = data_source_1.default.getRepository(WorkExperience_1.WorkExperience);
        this.educations = data_source_1.default.getRepository(Education_1.Education);
        this.profiles = data_source_1.default.getRepository(JobSeekerProfile_1.JobSeekerProfile);
    }
    async publishResumeEvent(userId, resumeId, action, meta = {}) {
        try {
            await messaging_1.broker.publish(messaging_1.QUEUES.RESUME_UPDATED, { userId, resumeId, action, ...meta });
        }
        catch (err) {
            console.error('[profiles-service] Failed to publish resume.updated event', err);
        }
    }
    async getProfileOrThrow(userId) {
        const p = await this.profiles.findOne({ where: { userId } });
        if (!p) {
            this.setStatus(404);
            throw new Error('Profile not found');
        }
        return p;
    }
    async list(req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const profile = await this.getProfileOrThrow(user.id);
        return this.resumes.find({ where: { profileId: profile.id } });
    }
    async create(dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const profile = await this.getProfileOrThrow(user.id);
        const entity = this.resumes.create({ profileId: profile.id, resumePath: dto.resumePath });
        const saved = await this.resumes.save(entity);
        this.setStatus(201);
        await this.publishResumeEvent(user.id, saved.id, 'created');
        return saved;
    }
    async update(id, dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const profile = await this.getProfileOrThrow(user.id);
        const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
        if (!r) {
            this.setStatus(404);
            throw new Error('Resume not found');
        }
        if (dto.resumePath !== undefined)
            r.resumePath = dto.resumePath;
        const updated = await this.resumes.save(r);
        await this.publishResumeEvent(user.id, updated.id, 'updated');
        return updated;
    }
    async remove(id, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const profile = await this.getProfileOrThrow(user.id);
        const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
        if (!r) {
            this.setStatus(404);
            throw new Error('Resume not found');
        }
        await this.resumes.delete(r.id);
        await this.publishResumeEvent(user.id, r.id, 'deleted');
        this.setStatus(204);
    }
    async addExperience(id, dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const profile = await this.getProfileOrThrow(user.id);
        const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
        if (!r) {
            this.setStatus(404);
            throw new Error('Resume not found');
        }
        const exp = this.experiences.create({ resumeId: r.id, company: dto.company, title: dto.title, startDate: dto.startDate, endDate: dto.endDate, description: dto.description });
        const saved = await this.experiences.save(exp);
        this.setStatus(201);
        await this.publishResumeEvent(user.id, r.id, 'experience_added', { experienceId: saved.id });
        return saved;
    }
    async addEducation(id, dto, req) {
        const user = req?.user;
        if (!user?.id) {
            this.setStatus(401);
            throw new Error('Unauthorized');
        }
        const profile = await this.getProfileOrThrow(user.id);
        const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
        if (!r) {
            this.setStatus(404);
            throw new Error('Resume not found');
        }
        const ed = this.educations.create({ resumeId: r.id, institution: dto.institution, degree: dto.degree, startDate: dto.startDate, endDate: dto.endDate });
        const saved = await this.educations.save(ed);
        this.setStatus(201);
        await this.publishResumeEvent(user.id, r.id, 'education_added', { educationId: saved.id });
        return saved;
    }
};
exports.ResumeController = ResumeController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "list", null);
__decorate([
    (0, tsoa_1.Post)(),
    (0, tsoa_1.SuccessResponse)('201'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    (0, tsoa_1.SuccessResponse)('204'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "remove", null);
__decorate([
    (0, tsoa_1.Post)('{id}/experiences'),
    (0, tsoa_1.SuccessResponse)('201'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "addExperience", null);
__decorate([
    (0, tsoa_1.Post)('{id}/educations'),
    (0, tsoa_1.SuccessResponse)('201'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "addEducation", null);
exports.ResumeController = ResumeController = __decorate([
    (0, tsoa_1.Route)('me/resumes'),
    (0, tsoa_1.Tags)('Resume'),
    (0, tsoa_1.Security)('bearerAuth')
], ResumeController);
