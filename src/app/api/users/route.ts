import * as UsersService from "@/backend/services/users.service";
import { User } from "@/models/user.model";

export async function GET() {
    const users: User[] | null = await UsersService.getUsers();
    return Response.json(users);
}