import { Request, Response } from "express";
import { Route } from "./Route";

export class Index extends Route
{
    exec(req:Request, res:Response):void
    {
        res.render( 'index', { title:'Express' } );
    }
}