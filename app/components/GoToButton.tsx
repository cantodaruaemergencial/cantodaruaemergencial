import { Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.a<{
  l?: number;
  r?: number;
  t?: number;
  b?: number;
}>`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: ${({ b }) => (b ? `${b}px` : '140px')};
  right: ${({ r }) => (r ? `${r}px` : '30px')};
  left: ${({ l }) => (l ? `${l}px` : null)};
  top: ${({ t }) => (t ? `${t}px` : null)};
  border-radius: 50%;
  background-color: #80f49d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoToButton = ({
  idGoTo,
  tooltipLabel,
  icon,
  bottomCoordPx,
  leftCoordPx,
  rightCoordPx,
  topCoordPx,
}: GoToButtonProps) => {
  if (!tooltipLabel) {
    return (
      <Wrapper
        href={idGoTo}
        l={leftCoordPx}
        r={rightCoordPx}
        t={topCoordPx}
        b={bottomCoordPx}
      >
        {icon}
      </Wrapper>
    );
  }

  return (
    <Tooltip title={tooltipLabel} arrow>
      <Wrapper
        href={idGoTo}
        l={leftCoordPx}
        r={rightCoordPx}
        t={topCoordPx}
        b={bottomCoordPx}
      >
        {icon}
      </Wrapper>
    </Tooltip>
  );
};

interface GoToButtonProps {
  idGoTo: string;
  tooltipLabel?: string;
  icon: ReactNode;

  rightCoordPx?: number;
  leftCoordPx?: number;
  topCoordPx?: number;
  bottomCoordPx?: number;
}

export default GoToButton;
