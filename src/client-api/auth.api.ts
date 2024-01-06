import { User } from "@/models/user.model";
import axios from "axios";
import { Credentials } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"; // Adjust the URL based on your API endpoint
const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

export const login = (credentials: Credentials) => {
    return axios.post<User>(`${AUTH_API_URL}/login`, credentials);
}

export enum keysEnum {
    auth = "AUTH",
}