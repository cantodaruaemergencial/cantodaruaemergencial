import { Tooltip } from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import styled from 'styled-components';

const Wrapper = styled.a`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 140px;
  right: 30px;
  border-radius: 50%;
  background-color: #80f49d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoToButton = ({ idGoTo, tooltipLabel }: GoToButtonProps) => {
  if (!tooltipLabel) {
    return (
      <Wrapper href={idGoTo}>
        <CheckCircleRounded htmlColor="white" fontSize="large" />
      </Wrapper>
    );
  }

  return (
    <Tooltip title={tooltipLabel} arrow>
      <Wrapper href={idGoTo}>
        <CheckCircleRounded htmlColor="white" fontSize="large" />
      </Wrapper>
    </Tooltip>
  );
};

interface GoToButtonProps {
  idGoTo: string;
  tooltipLabel?: string;
}

export default GoToButton;
