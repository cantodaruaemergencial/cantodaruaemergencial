import { CheckCircleRounded } from '@material-ui/icons';
import styled from 'styled-components';

const Wrapper = styled.a`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 140px;
  right: 30px;
  border-radius: 50%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoToButton = ({ idGoTo }: GoToButtonProps) => {
  return (
    <Wrapper href={idGoTo}>
      <CheckCircleRounded htmlColor="white" fontSize="large" />
    </Wrapper>
  );
};

interface GoToButtonProps {
  idGoTo: string;
}

export default GoToButton;
