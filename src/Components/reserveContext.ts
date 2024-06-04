import { createContext } from "react";
import { reserveObject } from "./Doctors";

export const reserveContext = createContext<reserveObject | undefined>(undefined)