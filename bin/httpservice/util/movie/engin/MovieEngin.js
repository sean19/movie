"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieEngin = void 0;
const MovieData_1 = require("./MovieData");
class MovieEngin {
    constructor() {
        this.is_start = false;
        this.list_data = [];
    }
    static i() {
        if (MovieEngin.en == null)
            MovieEngin.en = new MovieEngin();
        return MovieEngin.en;
    }
    addList(dlist) {
        dlist.forEach(mv => {
            this.list_data.push(new MovieData_1.MovieData(mv));
        });
        this.startLoad();
    }
    startLoad() {
        if (this.is_start == false) {
            // this.is_start = true;
            this.handleData();
        }
    }
    async handleData() {
        if (this.deelingvo)
            this.deelingvo.dispose();
        if (this.list_data.length > 0) {
            this.deelingvo = this.list_data.shift();
            await this.deelingvo.startLoad();
            this.is_start = false;
            this.startLoad();
        }
    }
}
exports.MovieEngin = MovieEngin;
//# sourceMappingURL=MovieEngin.js.map