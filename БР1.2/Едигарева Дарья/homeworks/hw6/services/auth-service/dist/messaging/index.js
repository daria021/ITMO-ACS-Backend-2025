"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broker = exports.QUEUES = void 0;
exports.initMessaging = initMessaging;
const data_source_1 = __importDefault(require("../config/data-source"));
const User_1 = require("../models/User");
const enums_1 = require("../models/enums");
const message_broker_1 = require("./message-broker");
exports.QUEUES = {
    USER_REGISTERED: 'user.registered',
    EMPLOYER_PROFILE_CREATED: 'employer.profile.created',
    RESUME_UPDATED: 'resume.updated',
};
exports.broker = new message_broker_1.MessageBroker();
async function initMessaging() {
    await exports.broker.connect();
    await exports.broker.consume(exports.QUEUES.EMPLOYER_PROFILE_CREATED, async (payload) => {
        if (!payload?.userId) {
            console.warn('[auth-service] employer.profile.created payload without userId');
            return;
        }
        try {
            const repo = data_source_1.default.getRepository(User_1.User);
            await repo.update({ id: payload.userId }, { role: enums_1.UserRole.Employer });
            console.log(`[auth-service] Role updated to employer for user ${payload.userId}`);
        }
        catch (err) {
            console.error('[auth-service] Failed to update user role from employer event', err);
        }
    });
}
