"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const routes_1 = require("./routes");
const data_source_1 = __importDefault(require("./config/data-source"));
const settings_1 = __importDefault(require("./config/settings"));
const messaging_1 = require("./messaging");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // Ensure correct base URL in Swagger.
        // В проде (через gateway) делаем /api/profiles первым, локально — '/'.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        swagger_json_1.default.servers = (process.env.NODE_ENV === 'production')
            ? [{ url: '/api/profiles' }, { url: '/' }]
            : [{ url: '/' }, { url: '/api/profiles' }];
        // Swagger UI and raw spec
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.app.get('/swagger.json', (_req, res) => res.json(swagger_json_1.default));
        (0, routes_1.RegisterRoutes)(this.app);
        const errorHandler = (err, req, res, next) => {
            const anyErr = err;
            if (anyErr && anyErr.status) {
                res.status(anyErr.status).json({ message: anyErr.message, details: anyErr.fields });
                return;
            }
            if (err instanceof Error) {
                console.error(err);
                res.status(500).json({ message: err.message });
                return;
            }
            next();
        };
        this.app.use(errorHandler);
    }
    async start() {
        await data_source_1.default.initialize();
        await (0, messaging_1.initMessaging)();
        this.app.listen(settings_1.default.APP_PORT, settings_1.default.APP_HOST, () => {
            console.log(`Profiles service at http://${settings_1.default.APP_HOST}:${settings_1.default.APP_PORT}`);
        });
    }
}
exports.App = App;
new App().start().catch(err => { console.error(err); process.exit(1); });
