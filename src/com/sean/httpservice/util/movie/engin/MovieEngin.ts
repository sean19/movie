import {MovieData} from "./MovieData";
import {MovieVO} from "../../VO/MovieVO";
import {MovieConfigVO} from "../../VO/MovieConfigVO";
import {ConfigMgr} from "../../../../ConfigMgr";
import {MovieClawer} from "../MovieClawer";

export class MovieEngin {

    private static en:MovieEngin;
    public static i():MovieEngin{
        if(MovieEngin.en==null)MovieEngin.en = new MovieEngin();
        return MovieEngin.en;
    }


    protected is_start:boolean = false;
    protected list_data:MovieData[] = [];
    protected deelingvo:MovieData;
    public addList(dlist:MovieVO[]):void{
        dlist.forEach(mv=>{
            this.list_data.push(new MovieData(mv));
        });
        this.startLoad();
    }
    protected startLoad():void{
        if(this.is_start==false){
            // this.is_start = true;
            this.handleData();
        }
    }
    protected async handleData(){
        if(this.deelingvo)this.deelingvo.dispose();
        if(this.list_data.length>0){
            this.deelingvo = this.list_data.shift();
            await this.deelingvo.startLoad();
            this.is_start=false;
            this.startLoad();
        }

    }
}