import { Route } from "./Route";
import { NextFunction, Request, Response } from "express";

export class Users extends Route
{
    exec(req:Request, res:Response):void
    {
        res.send( 'respond with a resource' );
    }
}
