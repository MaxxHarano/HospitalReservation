import { createContext } from "react";

export interface reserveObject {
    id: string;
    department: string;
    doctor: string;
    timeRange: string;
  }

const r:reserveObject = {
    id: '12345',
    department: "default",
    doctor: "basic",
    timeRange: "13:00",
} 

export const ReserveContext = createContext<reserveObject | undefined>(r)
