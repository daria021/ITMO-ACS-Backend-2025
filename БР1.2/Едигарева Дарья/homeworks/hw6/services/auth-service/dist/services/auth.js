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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../config/settings"));
const data_source_1 = __importDefault(require("../config/data-source"));
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tsyringe_1 = require("tsyringe");
const messaging_1 = require("../messaging");
let AuthService = class AuthService {
    constructor() {
        this.userRepo = data_source_1.default.getRepository(User_1.User);
    }
    async register(email, password) {
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing)
            throw new Error('Email already in use');
        const hash = await bcryptjs_1.default.hash(password, 10);
        const user = this.userRepo.create({ email, passwordHash: hash });
        const saved = await this.userRepo.save(user);
        try {
            await messaging_1.broker.publish(messaging_1.QUEUES.USER_REGISTERED, { id: saved.id, email: saved.email });
            console.log(`[auth-service] Published user.registered for ${saved.email}`);
        }
        catch (err) {
            console.error('[auth-service] Failed to publish user.registered event', err);
        }
        return saved;
    }
    async login(email, password) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user)
            throw new Error('Invalid credentials');
        const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!ok)
            throw new Error('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, settings_1.default.JWT_SECRET_KEY, { expiresIn: 60 * 5 });
        return { accessToken: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], AuthService);
