"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const resume_controller_1 = require("./controllers/resume-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const profile_controller_1 = require("./controllers/profile-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const health_controller_1 = require("./controllers/health-controller");
const auth_1 = require("./middlewares/auth");
// @ts-ignore - no great way to install types from subpackage
const ioc_1 = require("./ioc");
const expressAuthenticationRecasted = auth_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "Resume": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "profileId": { "dataType": "string", "required": true },
            "resumePath": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResumeCreateDto": {
        "dataType": "refObject",
        "properties": {
            "resumePath": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResumeUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "resumePath": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WorkExperience": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "resumeId": { "dataType": "string", "required": true },
            "company": { "dataType": "string", "required": true },
            "title": { "dataType": "string", "required": true },
            "startDate": { "dataType": "string", "required": true },
            "endDate": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExperienceCreateDto": {
        "dataType": "refObject",
        "properties": {
            "company": { "dataType": "string", "required": true },
            "title": { "dataType": "string", "required": true },
            "startDate": { "dataType": "string", "required": true },
            "endDate": { "dataType": "string" },
            "description": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Education": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "resumeId": { "dataType": "string", "required": true },
            "institution": { "dataType": "string", "required": true },
            "degree": { "dataType": "string", "required": true },
            "startDate": { "dataType": "string", "required": true },
            "endDate": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EducationCreateDto": {
        "dataType": "refObject",
        "properties": {
            "institution": { "dataType": "string", "required": true },
            "degree": { "dataType": "string", "required": true },
            "startDate": { "dataType": "string", "required": true },
            "endDate": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JobSeekerProfile": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "userId": { "dataType": "string", "required": true },
            "fullName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Error": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "message": { "dataType": "string", "required": true },
            "stack": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileCreateDto": {
        "dataType": "refObject",
        "properties": {
            "fullName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "fullName": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "silently-remove-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsResumeController_list = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/me/resumes', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController)), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController.prototype.list)), async function ResumeController_list(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsResumeController_list, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(resume_controller_1.ResumeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'list',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResumeController_create = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ResumeCreateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/me/resumes', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController)), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController.prototype.create)), async function ResumeController_create(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsResumeController_create, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(resume_controller_1.ResumeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResumeController_update = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ResumeUpdateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.put('/me/resumes/:id', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController)), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController.prototype.update)), async function ResumeController_update(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsResumeController_update, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(resume_controller_1.ResumeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResumeController_remove = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.delete('/me/resumes/:id', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController)), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController.prototype.remove)), async function ResumeController_remove(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsResumeController_remove, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(resume_controller_1.ResumeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'remove',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResumeController_addExperience = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ExperienceCreateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/me/resumes/:id/experiences', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController)), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController.prototype.addExperience)), async function ResumeController_addExperience(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsResumeController_addExperience, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(resume_controller_1.ResumeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'addExperience',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResumeController_addEducation = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EducationCreateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/me/resumes/:id/educations', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController)), ...((0, runtime_1.fetchMiddlewares)(resume_controller_1.ResumeController.prototype.addEducation)), async function ResumeController_addEducation(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsResumeController_addEducation, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(resume_controller_1.ResumeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'addEducation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProfileController_get = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/me/profile', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileController.prototype.get)), async function ProfileController_get(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProfileController_get, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(profile_controller_1.ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'get',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProfileController_create = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ProfileCreateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/me/profile', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileController.prototype.create)), async function ProfileController_create(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProfileController_create, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(profile_controller_1.ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProfileController_update = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ProfileUpdateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.put('/me/profile', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileController.prototype.update)), async function ProfileController_update(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProfileController_update, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(profile_controller_1.ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsHealthController_health = {};
    app.get('/health', ...((0, runtime_1.fetchMiddlewares)(health_controller_1.HealthController)), ...((0, runtime_1.fetchMiddlewares)(health_controller_1.HealthController.prototype.health)), async function HealthController_health(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsHealthController_health, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(health_controller_1.HealthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'health',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
