import {UtillDY2018PageInfoFL} from "./UtillDY2018PageInfoFL";
import {UtillDy2018FL} from "./UtillDy2018FL";
import {UtilDY2018} from "./UtilDY2018";

export class UtillDY2018AllFL {
    public async getallFL(){
        for (var i: number = 0; i < UtilDY2018.idx_fl.length; i++) {
            let movietype:number = UtilDY2018.idx_fl[i];
            var fl:UtillDy2018FL = new UtillDy2018FL();
            await fl.getData(movietype);
        }
    }
}