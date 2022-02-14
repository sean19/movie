import { Route } from "./Route";
import { Index } from "./Index";
import { Users } from "./Users";
import { Express } from "express";

export class RouteMgr
{
    private routes:Array<Route> = [];
    private static _instance:RouteMgr;

    constructor()
    {
        this.routes.push( new Index( "/" ) );
        this.routes.push( new Users( "/users" ) );
    }
    public static get instance():RouteMgr
    {
        if( null == RouteMgr._instance )
        {
            RouteMgr._instance = new RouteMgr();
        }

        return RouteMgr._instance;
    }

    public use( app:Express ):void
    {
        var routes:Array<Route> = this.routes;
        var length:number = routes.length;
        for ( var i:number = 0; i < length; i++ )
        {
            var handler:Route = routes[ i ];

            if ( handler.type == "GET" )
            {
                app.get( handler.path, handler.exec.bind( handler ) );
            }
            else
            {
                app.post( handler.path, handler.exec.bind( handler ) );
            }
        }
    }
}