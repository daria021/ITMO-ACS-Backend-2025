"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const company_1 = require("./services/company");
const employer_1 = require("./services/employer");
const vacancy_1 = require("./services/vacancy");
exports.iocContainer = {
    get(controller) {
        return tsyringe_1.container.resolve(controller);
    },
};
// Interface-token bindings
tsyringe_1.container.register(company_1.COMPANY_SERVICE, { useClass: company_1.CompanyService });
tsyringe_1.container.register(employer_1.EMPLOYER_SERVICE, { useClass: employer_1.EmployerService });
tsyringe_1.container.register(vacancy_1.VACANCY_SERVICE, { useClass: vacancy_1.VacancyService });
