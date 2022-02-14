"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const Route_1 = require("./Route");
class Users extends Route_1.Route {
    exec(req, res) {
        res.send('respond with a resource');
    }
}
exports.Users = Users;
//# sourceMappingURL=Users.js.map