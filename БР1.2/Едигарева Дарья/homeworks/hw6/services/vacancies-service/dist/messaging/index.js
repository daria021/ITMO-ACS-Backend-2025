"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broker = exports.QUEUES = void 0;
exports.initMessaging = initMessaging;
const message_broker_1 = require("./message-broker");
exports.QUEUES = {
    USER_REGISTERED: 'user.registered',
    EMPLOYER_PROFILE_CREATED: 'employer.profile.created',
    RESUME_UPDATED: 'resume.updated',
};
exports.broker = new message_broker_1.MessageBroker();
async function initMessaging() {
    await exports.broker.connect();
    await exports.broker.consume(exports.QUEUES.RESUME_UPDATED, async (payload) => {
        if (!payload?.userId || !payload?.resumeId) {
            console.warn('[vacancies-service] resume.updated payload missing userId or resumeId');
            return;
        }
        console.log('[vacancies-service] resume.updated received', payload);
    });
}
