import { Box, List } from '@mui/material';
import { ResourceType } from '../../types/types';

import { SocialSVG } from '../social-svg/social-svg';
import { ResourceName } from '../../const/const';

import './x.css';

export function ResourceItem({ item }: { item: ResourceType }) {
  return (
    <li style={{ width: '54px', textAlign: 'center' }}>
      <a className="social-link" href={item.href}>
        <SocialSVG name={item.type as ResourceName} />
      </a>
    </li>
  );
}

export function ResourceBlock({resources}: {resources?: ResourceType[]}) {
  const resourceElements = resources
    ? resources
      .filter((item) => item.type !== ResourceName.Site)
      .map((item) => <ResourceItem key={item.id} item={item} />)
    : null;
  const site = resources ? resources.find((item) => item.type === ResourceName.Site) : null;

  return (
    <Box>
      <List sx={{ display: 'flex', justifyContent: 'start' }}>
        {resourceElements}
        {site ? <ResourceItem item={site} /> : null}
      </List>
    </Box>
  );
}
