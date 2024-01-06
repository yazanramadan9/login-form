import { rolesEnum } from "@/enums";
import { User } from "@/models/user.model";

export const authenticateUser = async (): Promise<User | null> => {
    return {
        id: "1",
        firstName: "Yazan",
        lastName: "Ramadan",
        role: rolesEnum.admin
    } as User

    return null;
}