import styled from 'styled-components';

type UserAvatarProps = {
  radius: number;
};

export const UserAvatarBtn = styled.button.attrs({
  type: 'button',
})<UserAvatarProps>`
  width: ${({ radius }) => radius}px;
  height: ${({ radius }) => radius}px;
  overflow: hidden;
  background-color: #000000;
  border-radius: 50%;
  cursor: pointer;
  outline: goldenrod solid 2px;

  &:hover,
  &:focus {
    outline: gold solid 2px;
  }
`;

export const UserAvatarImg = styled.img.attrs({ width: 40, height: 40 })`
  width: 100%;
  height: 100%;
`;

// my-rate
