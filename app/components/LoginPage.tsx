import {
  Avatar,
  Container as MuiContainer,
  TextField as MuiTextField,
  Button as MuiButton,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import Card from './Card';

import { useAuthMethods, useAuthState } from '#/packages/auth/auth-context';

const Container = styled(MuiContainer)`
  && {
    justify-content: center;
    align-items: center;
    display: flex;
    min-height: 100vh;
    width: 100%;
    max-width: 400px;
  }
`;

const TextField = styled(MuiTextField)`
  && {
    margin-bottom: 1rem;
  }
`;

const Button = styled(MuiButton)`
  && {
    width: 100%;
  }
`;

const Logo = styled(Avatar)`
  && {
    width: 8rem;
    height: 8rem;
    margin: 3rem auto;
  }
`;

const LoginPage = (): ReactElement => {
  const { isLoading, isLogged } = useAuthState();
  const { login } = useAuthMethods();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  if (isLogged) {
    router.replace('/dashboard');
  }

  return (
    <Container>
      <Card>
        <Logo alt="Canto da Rua" src="/images/logo.png" />

        <TextField
          autoFocus
          label="Email"
          variant="outlined"
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button
          onClick={() => {
            login(email, password);
          }}
          variant="outlined"
          disabled={isLoading}
        >
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default LoginPage;
