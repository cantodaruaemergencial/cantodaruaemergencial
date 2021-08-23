import {
  AppBar,
  Box,
  Button,
  Container,
  withTheme,
} from '@material-ui/core';
import Link from 'next/link';
import styled from 'styled-components';

const Toolbar = styled(Container)`
  && {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
`;

const NavButton = withTheme(styled(Button)`
  && {
    margin-right: 1rem;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      display: none;
    }
  }
`);

const FloatingBox = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  height: 26px;
  right: 0;
  top: 5px;
`;

const PublicNavBar = (): React.ReactElement => {

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <FloatingBox>
          <NavButton>
            <Link href="/login">Login</Link>
          </NavButton>
        </FloatingBox>
      </Toolbar>
    </AppBar>
  );
};

export default PublicNavBar;
