import { rolesEnum } from "@/enums";
import { User } from "@/models/user.model";

export const getUsers = async (): Promise<User[] | null> => {
    const users: User[] = [
        {
            id: "1",
            username: "yramadan",
            firstName: "Yazan",
            lastName: "Ramadan",
            role: rolesEnum.admin
        } as User,
        {
            id: "2",
            username: "z_akram",
            firstName: "Zaid",
            lastName: "Akram",
            role: rolesEnum.admin
        } as User,
        {
            id: "3",
            username: "hamzah",
            firstName: "Hamzah",
            lastName: "Khellah",
            role: rolesEnum.admin
        } as User,
        {
            id: "4",
            username: "MK",
            firstName: "Mustafa",
            lastName: "Khaleel",
            role: rolesEnum.admin
        } as User,
    ]
    return users;

    return null;
}