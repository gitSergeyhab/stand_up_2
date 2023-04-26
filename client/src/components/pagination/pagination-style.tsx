// @keyframes cdp-in {
//   from {
//     transform: scale(1.5);
//     opacity: 0;
//   }
//   to {
//     transform: scale(1);
//     opacity: 1;
//   }
// }

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.section`
  background-color: #0d0101;
  text-align: center;
  padding: 20px 0;
  font-size: 0;
  z-index: 6;
  margin: 50px 0;
  /* animation: 500ms ease both; */
  border-radius: 1rem;
  width: 100%;
  max-width: 640px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageLink = styled(Link)<{ current?: number; extreme?: number }>`
  font-size: 14px;
  text-decoration: none;

  transition: background 250ms;

  display: inline-block;
  text-transform: uppercase;
  margin: 0 3px 6px;

  height: 28px;
  min-width: 28px;
  border-radius: 28px;
  /* border: 2px solid #fff; */
  line-height: 38px;
  padding: 0;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.03em;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ current }) => (current
    ? 'border: 2px solid gold; box-shadow: 1px 1px 2px 0px gold; pointer-events: none;'
    : 'border: 2px solid #fff;')}
  ${({ extreme, current }) => (extreme || current
    ? ''
    : `
        @media (max-width: 700px) {
            display: none;
        };
    `)}
    &:hover, &:focus {
    /* transform: scale(1.03); */
    transition: 0.3s;
    background-color: #300606;
  }
`;

export const SpaceLink = styled(PageLink).attrs({ to: '#' })`
  border: none;
  pointer-events: none;
`;

export const NextPrevPageLink = styled(PageLink)<{ disable?: number }>`
  padding: 0 16px;
  margin: 0 12px 6px;
  display: inline-flex;

  ${({ disable }) => (disable ? 'color: gray; border-color: gray; pointer-events: none;' : '')}
  @media (max-width: 700px) {
    margin: 0 22px 6px;
  }
`;

//   &_i {
//     font-size: 14px;
//     text-decoration: none;

//     transition: background 250ms;

//     display: inline-block;
//     text-transform: uppercase;
//     margin: 0 3px 6px;
//     height: 38px;
//     min-width: 38px;
//     border-radius: 38px;
//     border: 2px solid #fff;
//     line-height: 38px;
//     padding: 0;
//     color: #fff;
//     font-weight: 700;
//     letter-spacing: .03em;
//     display: none;

//     &:first-child,
//     &:last-child {
//       padding: 0 16px;
//       margin: 0 12px 6px;
//     }

//     &:last-child,
//     &:nth-child(2),
//     &:nth-last-child(2) {
//       display: inline-block;
//     }
//   }

//   &_i:hover {
//     background-color: #000;
//     color: #fff;
//   }

//   &:not([actpage="1"]) &_i:nth-child(1) {
//     display: inline-block;
//   }
// }
// @for $i from 1 through 80 {
//   .cdp[actpage="#{$i}"] {
//     // 3 before
//     .cdp_i:nth-child(#{$i - 2}):not(:first-child):not(:nth-child(2)) {
//       display: inline-block;
//       pointer-events: none;
//       color: transparent;
//       border-color: transparent;
//       width: 50px;
//       &:after {
//         content: '...';
//         color: #fff;
//         font-size: 32px;
//         margin-left: -6px;
//       }
//     }
//     // 2 before
//     .cdp_i:nth-child(#{$i - 1}):not(:first-child) {
//       display: inline-block;
//     }
//     // before
//     .cdp_i:nth-child(#{$i}):not(:first-child) {
//       display: inline-block;
//     }
//     // active
//     .cdp_i:nth-child(#{$i + 1}) {
//       background-color: #000;
//       color: #fff;
//       display: inline-block;

//       +.cdp_i:last-child {
//         display: none !important;
//       }
//     }
//     // next
//     .cdp_i:nth-child(#{$i + 2}):not(:last-child) {
//       display: inline-block;
//     }
//     // 2 next
//     .cdp_i:nth-child(#{$i + 3}):not(:last-child) {
//       display: inline-block;
//     }
//     // 3 next
//     .cdp_i:nth-child(#{$i + 4}):not(:last-child):not(:nth-last-child(2)) {
//       display: inline-block;
//       pointer-events: none;
//       color: transparent;
//       border-color: transparent;
//       width: 50px;
//       &:after {
//         content: '...';
//         color: #fff;
//         font-size: 32px;
//         margin-left: -6px;
//       }
//     }
//   }
// }
