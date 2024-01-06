import { User } from "@/models/user.model";
import * as AuthService from "@/backend/services/auth.service";
export async function POST(req: Request) {
    const loggedInUser: User | null = await AuthService.authenticateUser();
    return Response.json(loggedInUser);
}