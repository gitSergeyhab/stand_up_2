import styled from 'styled-components';

const NativeTitle = styled.h1`
  margin: 1rem;
  margin-bottom: 0.5rem;
`;

const EnTitle = styled.h2`
  margin: 1rem;
  color: #222222;
`;

export function Titles({ native, en }: { native: string; en: string | null | undefined }) {
  return (
    <>
      <NativeTitle>{native}</NativeTitle>
      <EnTitle> {en}</EnTitle>
    </>
  );
}
