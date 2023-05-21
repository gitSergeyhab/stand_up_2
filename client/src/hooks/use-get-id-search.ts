import { useLocation, useParams } from "react-router-dom";
import { getTypes } from "../utils/utils";

export const useGetIdSearch = () => {
  const { search, pathname } = useLocation();
  const id = useParams().id as string // ?? fix
  const type = getTypes(pathname) // ?? fix

  return { id, search, type: type.mainType, pathname }
}
