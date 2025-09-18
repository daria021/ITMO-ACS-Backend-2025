"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const vacancy_controller_1 = require("./controllers/vacancy-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const employer_controller_1 = require("./controllers/employer-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const company_controller_1 = require("./controllers/company-controller");
const auth_1 = require("./middlewares/auth");
// @ts-ignore - no great way to install types from subpackage
const ioc_1 = require("./ioc");
const expressAuthenticationRecasted = auth_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "Industry": {
        "dataType": "refEnum",
        "enums": ["technology", "finance", "healthcare", "education", "manufacturing", "other"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Company": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "industry": { "ref": "Industry", "required": true },
            "website": { "dataType": "string" },
            "address": { "dataType": "string" },
            "phone": { "dataType": "string" },
            "email": { "dataType": "string" },
            "foundedDate": { "dataType": "string" },
            "employeesCount": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployerProfile": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "company": { "ref": "Company", "required": true },
            "userId": { "dataType": "string", "required": true },
            "phone": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Vacancy": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "company": { "ref": "Company", "required": true },
            "employerProfile": { "ref": "EmployerProfile", "required": true },
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "requirements": { "dataType": "string" },
            "salaryMin": { "dataType": "double" },
            "salaryMax": { "dataType": "double" },
            "industry": { "ref": "Industry", "required": true },
            "experienceRequired": { "dataType": "double" },
            "postedDate": { "dataType": "datetime", "required": true },
            "expireDate": { "dataType": "datetime" },
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
    "VacancyCreateDto": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "requirements": { "dataType": "string" },
            "salaryMin": { "dataType": "double" },
            "salaryMax": { "dataType": "double" },
            "industry": { "ref": "Industry", "required": true },
            "experienceRequired": { "dataType": "double" },
            "expireDate": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VacancyUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string" },
            "description": { "dataType": "string" },
            "requirements": { "dataType": "string" },
            "salaryMin": { "dataType": "double" },
            "salaryMax": { "dataType": "double" },
            "industry": { "ref": "Industry" },
            "experienceRequired": { "dataType": "double" },
            "expireDate": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployerCreateDto": {
        "dataType": "refObject",
        "properties": {
            "companyId": { "dataType": "string", "required": true },
            "phone": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompanyCreateDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "industry": { "ref": "Industry", "required": true },
            "website": { "dataType": "string" },
            "address": { "dataType": "string" },
            "phone": { "dataType": "string" },
            "email": { "dataType": "string" },
            "foundedDate": { "dataType": "string" },
            "employeesCount": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CompanyCreateDto_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string" }, "description": { "dataType": "string" }, "industry": { "ref": "Industry" }, "website": { "dataType": "string" }, "address": { "dataType": "string" }, "phone": { "dataType": "string" }, "email": { "dataType": "string" }, "foundedDate": { "dataType": "string" }, "employeesCount": { "dataType": "double" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompanyUpdateDto": {
        "dataType": "refAlias",
        "type": { "ref": "Partial_CompanyCreateDto_", "validators": {} },
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
    const argsVacancyController_search = {
        industry: { "in": "query", "name": "industry", "ref": "Industry" },
        salaryMin: { "in": "query", "name": "salaryMin", "dataType": "double" },
        salaryMax: { "in": "query", "name": "salaryMax", "dataType": "double" },
        experienceMin: { "in": "query", "name": "experienceMin", "dataType": "double" },
        experienceMax: { "in": "query", "name": "experienceMax", "dataType": "double" },
    };
    app.get('/vacancies', ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController)), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController.prototype.search)), async function VacancyController_search(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsVacancyController_search, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(vacancy_controller_1.VacancyController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'search',
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
    const argsVacancyController_detail = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.get('/vacancies/:id', ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController)), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController.prototype.detail)), async function VacancyController_detail(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsVacancyController_detail, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(vacancy_controller_1.VacancyController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'detail',
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
    const argsVacancyController_create = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "VacancyCreateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/vacancies', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController)), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController.prototype.create)), async function VacancyController_create(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsVacancyController_create, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(vacancy_controller_1.VacancyController);
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
    const argsVacancyController_update = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "VacancyUpdateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.patch('/vacancies/:id', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController)), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController.prototype.update)), async function VacancyController_update(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsVacancyController_update, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(vacancy_controller_1.VacancyController);
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
    const argsVacancyController_remove = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.delete('/vacancies/:id', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController)), ...((0, runtime_1.fetchMiddlewares)(vacancy_controller_1.VacancyController.prototype.remove)), async function VacancyController_remove(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsVacancyController_remove, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(vacancy_controller_1.VacancyController);
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
    const argsEmployerController_get = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/me/employer', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(employer_controller_1.EmployerController)), ...((0, runtime_1.fetchMiddlewares)(employer_controller_1.EmployerController.prototype.get)), async function EmployerController_get(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmployerController_get, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(employer_controller_1.EmployerController);
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
    const argsEmployerController_create = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EmployerCreateDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.post('/me/employer', authenticateMiddleware([{ "bearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(employer_controller_1.EmployerController)), ...((0, runtime_1.fetchMiddlewares)(employer_controller_1.EmployerController.prototype.create)), async function EmployerController_create(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmployerController_create, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(employer_controller_1.EmployerController);
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
    const argsCompanyController_list = {};
    app.get('/companies', ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController)), ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController.prototype.list)), async function CompanyController_list(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCompanyController_list, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(company_controller_1.CompanyController);
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
    const argsCompanyController_detail = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.get('/companies/:id', ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController)), ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController.prototype.detail)), async function CompanyController_detail(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCompanyController_detail, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(company_controller_1.CompanyController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            await templateService.apiHandler({
                methodName: 'detail',
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
    const argsCompanyController_create = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "CompanyCreateDto" },
    };
    app.post('/companies', ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController)), ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController.prototype.create)), async function CompanyController_create(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCompanyController_create, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(company_controller_1.CompanyController);
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
    const argsCompanyController_update = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "CompanyUpdateDto" },
    };
    app.patch('/companies/:id', ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController)), ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController.prototype.update)), async function CompanyController_update(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCompanyController_update, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(company_controller_1.CompanyController);
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
    const argsCompanyController_remove = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.delete('/companies/:id', ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController)), ...((0, runtime_1.fetchMiddlewares)(company_controller_1.CompanyController.prototype.remove)), async function CompanyController_remove(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCompanyController_remove, request, response });
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(company_controller_1.CompanyController);
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
