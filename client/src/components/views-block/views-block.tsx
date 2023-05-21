import styled from 'styled-components';
import { SVG } from '../svg/svg';

type ViewsProps = {
  views?: string;
  totalViews?: string;
};

const ViewP = styled.p`
  margin: 0;
  font-size: 13px;
`;

const ViewContainer = styled.div`
  display: flex;
  padding: 1rem;
`;

export function ViewsBlock({ totalViews, views }: ViewsProps) {
  return (
    <ViewContainer>
      <SVG name="eye" />
      <ViewP>
        {views} (за неделю); {totalViews} (за вме время)
      </ViewP>
    </ViewContainer>
  );
}
