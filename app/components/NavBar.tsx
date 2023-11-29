import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  withTheme,
  Typography,
} from '@material-ui/core';
import {
  // DashboardRounded,
  ExitToAppRounded,
  PersonRounded,
  TransferWithinAStationRounded,
} from '@material-ui/icons';
import Link from 'next/link';
import styled from 'styled-components';

import { useAuthMethods, useAuthState } from '#/packages/auth/auth-context';

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

const ProfileBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0px 8px;
`;

const ProfileAvatar = withTheme(styled(Avatar)`
  color: ${({ theme }) => theme.palette.secondary.main};
`);

const AssociationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
`;

const AssociationLabel = withTheme(styled(Typography)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 600;
`);

const Flag = withTheme(styled.img`
  height: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`);

const ButtonAppBar = (): React.ReactElement => {
  const { logout } = useAuthMethods();
  const { userProfile } = useAuthState();

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Links>
          <Link href="/pessoas">
            <Logo
              alt="Canto da Rua"
              src={`${process.env.NEXT_PUBLIC_BUCKET_NAME}/images/logo.png`}
            />
          </Link>

          {/* <NavIconButton>
            <Link href="/dashboard">
              <DashboardRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/dashboard">Dashboard</Link>
          </NavButton> */}

          <NavIconButton>
            <Link href="/pessoas">
              <PersonRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/pessoas">Pessoas</Link>
          </NavButton>

          <NavIconButton>
            <Link href="/servicos/cadastro">
              <TransferWithinAStationRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/servicos/cadastro">Serviços</Link>
          </NavButton>

          <NavIconButton>
            <Link href="/historico">
              <TransferWithinAStationRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/historico">Histórico</Link>
          </NavButton>

          {/* <NavIconButton>
            <Link href="/relatorios">
              <TransferWithinAStationRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/relatorios">Relatórios</Link>
          </NavButton> */}
        </Links>
      </Toolbar>
      <FloatingBox>
        <ProfileBox>
          <ProfileAvatar>
            {userProfile?.displayName
              .split(' ')
              .map((m) => m.slice(0, 1))
              .join('')}
          </ProfileAvatar>
          <AssociationBox>
            {userProfile?.associations.map((a) => (
              <AssociationLabel>{a.name}</AssociationLabel>
            ))}
          </AssociationBox>
        </ProfileBox>
        <NavIconButton onClick={logout}>
          <ExitToAppRounded />
        </NavIconButton>
        <NavButton onClick={logout}>Sair</NavButton>
        <Flag src={`${process.env.NEXT_PUBLIC_BUCKET_NAME}/images/flag.png`} />
      </FloatingBox>
    </AppBar>
  );
};

export default ButtonAppBar;
