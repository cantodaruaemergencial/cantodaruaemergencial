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
  personId?: string;
  form: FormType;
}

export interface IResult {
  type: string;
  message: string;
}

const PersonPage = ({ personId, form }: Props): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = async (data: { [key: string]: unknown }) => {
    PeopleService.saveNewPerson(data)
      .then(() => {
        enqueueSnackbar('Cadastro realizado com sucesso!', {
          variant: 'success',
        });
        router.replace('/people');
      })
      .catch(() => {
        enqueueSnackbar('Ocorreu um erro. Tente novamente.', {
          variant: 'error',
        });
      });
  };

  return (
    <Container>
      <PageHeader title="Cadastro" />
      {personId}
      {form && <Form form={form} onSubmit={onSubmit} />}
    </Container>
  );
};

export default PersonPage;
