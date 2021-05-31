import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  withTheme,
} from '@material-ui/core';
import {
  DashboardRounded,
  ExitToAppRounded,
  PersonRounded,
} from '@material-ui/icons';
import Link from 'next/link';
import styled from 'styled-components';

import { useAuthMethods } from '#/packages/auth/auth-context';

const Logo = withTheme(styled(Avatar)`
  && {
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
    cursor: pointer;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      margin-right: 1rem;
    }
  }
`);

const Toolbar = styled(Container)`
  && {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
`;

const Links = styled(Box)`
  display: flex;
  align-items: center;
`;

const NavButton = withTheme(styled(Button)`
  && {
    margin-right: 1rem;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      display: none;
    }
  }
`);

const NavIconButton = withTheme(styled(IconButton)`
  && {
    ${({ theme }) => theme.breakpoints.up('md')} {
      display: none;
    }
  }
`);

const FloatingBox = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  height: 56px;
  right: 0;
  top: 20px;
`;

const Flag = withTheme(styled.img`
  height: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`);

const ButtonAppBar = (): React.ReactElement => {
  const { logout } = useAuthMethods();

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Links>
          <Link href="/dashboard">
            <Logo alt="Canto da Rua" src="/images/logo.png" />
          </Link>

          <NavIconButton>
            <Link href="/dashboard">
              <DashboardRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/dashboard">Dashboard</Link>
          </NavButton>

          <NavIconButton>
            <Link href="/people">
              <PersonRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/people">Pessoas</Link>
          </NavButton>
        </Links>
      </Toolbar>
      <FloatingBox>
        <NavIconButton onClick={logout}>
          <ExitToAppRounded />
        </NavIconButton>
        <NavButton onClick={logout}>Sair</NavButton>
        <Flag src="/images/flag.png" />
      </FloatingBox>
    </AppBar>
  );
};

export default ButtonAppBar;
