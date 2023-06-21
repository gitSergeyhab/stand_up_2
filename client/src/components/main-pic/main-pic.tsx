import styled from 'styled-components';
import { DefaultPath, SERVER_URL } from '../../const/const';

export const MainPicSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const MainPicImg = styled.img`
  width: 70%;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.8);
`;

export function MainPic({ src, alt }: { src?: string; alt: string }) {
  return (
    <MainPicSection>
      <MainPicImg
        src={src ? `${SERVER_URL}${src}` : DefaultPath.Any}
        alt={alt}
      />
    </MainPicSection>
  );
}
