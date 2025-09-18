"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const profile_1 = require("./services/profile");
exports.iocContainer = {
    get(controller) {
        return tsyringe_1.container.resolve(controller);
    },
};
// Bind interface token to implementation
tsyringe_1.container.register(profile_1.PROFILE_SERVICE, { useClass: profile_1.ProfileService });
