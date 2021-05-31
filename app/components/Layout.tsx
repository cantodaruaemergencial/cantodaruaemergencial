import { Box } from '@material-ui/core';
import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';

import NavBar from '#/components/NavBar';
import { useAuthState } from '#/packages/auth/auth-context';

interface Props {
  children: ReactElement | ReactElement[];
  title: string;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({
  children,
  title = 'This is the default title',
}: Props): ReactElement => {
  const { userProfile } = useAuthState();

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {userProfile && <NavBar />}
      {children}
    </Container>
  );
};

export default Layout;
