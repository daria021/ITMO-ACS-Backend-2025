"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const auth_1 = require("./services/auth");
const auth_types_1 = require("./services/auth.types");
exports.iocContainer = {
    get(controller) {
        return tsyringe_1.container.resolve(controller);
    },
};
// Register interface-based bindings
tsyringe_1.container.register(auth_types_1.AUTH_SERVICE, { useClass: auth_1.AuthService });
