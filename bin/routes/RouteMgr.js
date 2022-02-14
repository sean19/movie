"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteMgr = void 0;
const Index_1 = require("./Index");
const Users_1 = require("./Users");
class RouteMgr {
    constructor() {
        this.routes = [];
        this.routes.push(new Index_1.Index("/"));
        this.routes.push(new Users_1.Users("/users"));
    }
    static get instance() {
        if (null == RouteMgr._instance) {
            RouteMgr._instance = new RouteMgr();
        }
        return RouteMgr._instance;
    }
    use(app) {
        var routes = this.routes;
        var length = routes.length;
        for (var i = 0; i < length; i++) {
            var handler = routes[i];
            if (handler.type == "GET") {
                app.get(handler.path, handler.exec.bind(handler));
            }
            else {
                app.post(handler.path, handler.exec.bind(handler));
            }
        }
    }
}
exports.RouteMgr = RouteMgr;
//# sourceMappingURL=RouteMgr.js.map