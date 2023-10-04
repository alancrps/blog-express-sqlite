import jwt from "jsonwebtoken";
import logger from "../logger/logger";


const secret = process.env.SECRET_JWT || "DefaultPassword";

export const generarTokenJWT = (payload: object): string => {
	const token = jwt.sign(payload, secret, { expiresIn: "2h" });
	logger.debug(secret)
	return token;
};	

// export const verificarToken = (token:string): token => {

// }