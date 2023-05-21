import { SERVER_URL } from '../../const/const';
import { ImageCC } from '../../store/images-api';

export function Picture({ item, name }: { item: ImageCC; name: string }) {
  return <img src={`${SERVER_URL}${item.imagePath}`} alt={name} width="20%" />;
}
