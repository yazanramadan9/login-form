import { User } from "@/models/user.model";
import axios from "axios";
import { mapToQueryParams } from "@/utils/api-shared.utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"; // Adjust the URL based on your API endpoint
const USERS_API_URL = `${API_BASE_URL}/api/users`;

export const getUsers = (filters: any = null): Promise<User[]> => {
    let queryParams = mapToQueryParams(filters);

    if (filters) {
        queryParams = mapToQueryParams(filters);
    }

    return axios.get<User[]>(`${USERS_API_URL}${queryParams}`).then(res => res.data);
}

export enum keysEnum {
    users = "USERS",
}