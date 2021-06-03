import { Container as MuiContainer } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import Form from '../Form/Form';
import PageHeader from '../PageHeader';

import PeopleService from '#/services/PeopleService';
import { Form as FormType } from '#/types/Forms';

const Container = styled(MuiContainer)`
  && {
    max-width: 600px;
  }
`;

interface Props {
  personId?: number | null;
  form?: FormType | null;
}

export interface IResult {
  type: string;
  message: string;
}

const PersonPage = ({ personId, form }: Props): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = async (data: { [key: string]: unknown }) => {
    PeopleService.savePerson(data, personId)
      .then(() => {
        enqueueSnackbar('Cadastro realizado com sucesso!', {
          variant: 'success',
        });
        router.replace('/pessoas');
      })
      .catch(() => {
        enqueueSnackbar('Ocorreu um erro. Tente novamente.', {
          variant: 'error',
        });
      });
  };

  return (
    <Container>
      <PageHeader title={'Cadastro'} />
      {form && <Form form={form} onSubmit={onSubmit} />}
    </Container>
  );
};

export default PersonPage;
