import { Typography } from '@mui/material';
import { withTheme } from '@mui/styles';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const Header = withTheme(styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  margin: 2.5rem 0 2rem;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin: 2rem 0 2rem;
  }
`);

const Title = styled(Typography)`
  && {
    grid-area: title;
    margin: 0;
  }
`;

interface Props {
  title: string | ReactNode;
  sideComponent?: ReactElement | ReactElement[];
  className?: string;
}

const PageHeader = ({
  title,
  sideComponent,
  className,
}: Props): ReactElement => (
  <Header className={className}>
    <Title variant="h1">{title}</Title>
    {sideComponent}
  </Header>
);

export default PageHeader;
