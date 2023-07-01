import { Role } from "../store/actions";

export type Message = {
  id: string;
  userId: string;
  avatar?: string;
  roles: Role[];
  text: string;
  nik: string;
}
