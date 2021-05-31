import { Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const Header = withTheme(styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  margin: 2.5rem 0 2rem;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin: 2rem 0 1.5rem;
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
