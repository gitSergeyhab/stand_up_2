import { Role } from "../store/actions";

const UserColor = {
  ThisUser: 'goldenrod',
  User: '#FFF',
  Admin: '#019f23',
  Moderator: '#22b7f7',
}

type GetColorFromUserData = {
  roles: Role[],
  userAuthId?: string,
  userMessageId?: string,
}
export const getColorFromUserData = ({roles, userAuthId, userMessageId}: GetColorFromUserData) => {
  if (userAuthId === userMessageId) {
    return UserColor.ThisUser;
  }
  if (roles.includes(Role.Admin)) {
    return UserColor.Admin;
  }
  if (roles.includes(Role.Moderator)) {
    return UserColor.Moderator;
  }
  return UserColor.User;
}
