import { ResourceName } from '../../const/const';
import { ResourceType, SimpleDict } from '../../types/types';
import { SocialSVG } from '../social-svg/social-svg';

export const ResourceBootstrapClasses: SimpleDict = {
  Site: '',
  Facebook: 'bi bi-facebook',
  YouTube: 'bi bi-youtube',
  WhatsApp: 'bi bi-whatsapp',
  Instagram: 'bi bi-instagram',
  VKontakte: 'fa fa-vk',
  Telegram: 'bi bi-telegram',
};

export function SocialLink({ item }: { item: ResourceType }) {
  return (
    <a href={item.href} style={{ color: '#1C0D0F' }}>
      <SocialSVG name={item.type as ResourceName} />
    </a>
  );
}
