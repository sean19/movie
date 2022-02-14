"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
class Route {
    constructor(path, type = "GET") {
        this.path = path;
        this.type = type;
    }
    exec(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map