import jwt from "jsonwebtoken";
import logger from "../logger/logger";
import { IJwtPayload } from "./jwt.interface";


const secret = process.env.SECRET_JWT || "DefaultPassword";

export const generarTokenJWT = (payload: IJwtPayload): string => {
	const token = jwt.sign(payload, secret, { expiresIn: "2h" });
	return token;
};	
