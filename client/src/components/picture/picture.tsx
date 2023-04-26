import { PictureType } from '../../types/types';

export function Picture({ item, name }: { item: PictureType; name: string }) {
  return <img src={`/assets${item.src}`} alt={name} width="20%" />;
}
