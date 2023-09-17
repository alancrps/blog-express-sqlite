import { NextFunction } from "express";
import { Request, Response } from "express";
import logger from "../logger/logger";
export function logMiddleware(req: Request, res: Response, next: NextFunction){
    logger.debug(`El ip ${req.ip} ingreso a ${req.url}`)
    next();
}