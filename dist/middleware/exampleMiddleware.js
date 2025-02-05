"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloMiddleware = void 0;
const helloMiddleware = (req, res, next) => {
    console.log("Hello From Middleware");
    next();
};
exports.helloMiddleware = helloMiddleware;
