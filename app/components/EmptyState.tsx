import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled(Box)`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

const Message = styled(Typography)`
  && {
    font-weight: bold;
  }
`;

interface Props {
  message?: string;
  className?: string;
}

const EmptyState = ({
  message = 'Nenhum resultado encontrado.',
  className,
}: Props) => (
  <Container className={className}>
    <Message>{message}</Message>
  </Container>
);

export default EmptyState;
