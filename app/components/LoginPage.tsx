import {
  Avatar,
  Container as MuiContainer,
  TextField as MuiTextField,
  Button as MuiButton,
  InputAdornment,
} from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import Card from './Card';

import { useAuthMethods, useAuthState } from '#/packages/auth/auth-context';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

const Form = styled.form``;

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

// const BackLabelText = styled.p`
//   font-size: 0.875rem;
//   color: '#706e6e';
//   text-align: center;
// `;

const LoginPage = (): ReactElement => {
  const { isLoading, isLogged } = useAuthState();
  const { login } = useAuthMethods();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  if (isLogged) {
    router.replace('/pessoas');
  }

  return (
    <Container>
      <Card>
        <Logo
          alt="Canto da Rua"
          src={`${process.env.NEXT_PUBLIC_BUCKET_NAME}/images/logo.png`}
        />

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            login(email, password);
          }}
        >
          <TextField
            autoFocus
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            variant="outlined"
            type={!showPassword ? 'password' : 'text'}
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: password.length ? (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword((oldValue) => !oldValue)}
                >
                  {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ) : null,
            }}
          />
          <Button variant="outlined" type="submit" disabled={isLoading}>
            Login
          </Button>
          {/* <BackLabelText>
            <Link href="/">Voltar para Dashboard</Link>
          </BackLabelText> */}
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
