"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const Route_1 = require("./Route");
class Index extends Route_1.Route {
    exec(req, res) {
        res.render('index', { title: 'Express' });
    }
}
exports.Index = Index;
//# sourceMappingURL=Index.js.map