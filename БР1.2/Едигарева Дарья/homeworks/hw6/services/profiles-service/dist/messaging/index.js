"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broker = exports.QUEUES = void 0;
exports.initMessaging = initMessaging;
require("../ioc");
const tsyringe_1 = require("tsyringe");
const message_broker_1 = require("./message-broker");
const profile_1 = require("../services/profile");
exports.QUEUES = {
    USER_REGISTERED: 'user.registered',
    EMPLOYER_PROFILE_CREATED: 'employer.profile.created',
    RESUME_UPDATED: 'resume.updated',
};
exports.broker = new message_broker_1.MessageBroker();
async function initMessaging() {
    await exports.broker.connect();
    await exports.broker.consume(exports.QUEUES.USER_REGISTERED, async (payload) => {
        if (!payload?.id) {
            console.warn('[profiles-service] user.registered payload without id');
            return;
        }
        try {
            const profileService = tsyringe_1.container.resolve(profile_1.PROFILE_SERVICE);
            const existing = await profileService.getMy(payload.id);
            if (existing) {
                return;
            }
            const fallbackName = payload.email ?? 'New user';
            await profileService.createForUser(payload.id, { fullName: fallbackName });
            console.log(`[profiles-service] Auto-created profile for ${payload.id}`);
        }
        catch (err) {
            console.error('[profiles-service] Failed to create profile from user.registered', err);
        }
    });
}
