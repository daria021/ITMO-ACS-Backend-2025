"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
const http_errors_1 = require("http-errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../config/settings"));
async function expressAuthentication(request, securityName, _scopes) {
    if (securityName !== 'bearerAuth') {
        throw new Error(`Unknown security scheme: ${securityName}`);
    }
    const auth = request.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new http_errors_1.Unauthorized('No Bearer token provided');
    }
    const token = auth.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, settings_1.default.JWT_SECRET_KEY);
        request.user = payload;
        return payload;
    }
    catch {
        throw new http_errors_1.Unauthorized('Invalid or expired token');
    }
}
