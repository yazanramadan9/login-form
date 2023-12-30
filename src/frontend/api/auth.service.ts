import { Credentials } from "@/frontend/types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"; // Adjust the URL based on your API endpoint
const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

export const login = (credentials: Credentials) => {
    return axios.post(`${AUTH_API_URL}/login`, credentials);
}