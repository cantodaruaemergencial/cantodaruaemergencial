import PeopleService from '#/services/PeopleService';
import { Form as FormType } from '#/types/Forms';
import { Person } from '#/types/People';
import { Container as MuiContainer } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Form from '../Form/Form';
import PageHeader from '../PageHeader';
import PersonCardModal from '../PersonCardModal';

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
  const router = useRouter();

  const [personModal, setPersonModal] = useState<{
    person: Person | null;
    open: boolean;
  }>({ open: false, person: null });

  const onSubmit = async (data: { [key: string]: unknown }) => {
    return new Promise<string | null>((resolve, reject) => {
      PeopleService.savePerson(data, personId)
        .then((person) => {
          if (personId !== null) {
            router.replace('/pessoas');
            redirectTo(person?.CardNumber);
            resolve('Cadastro atualizado com sucesso!');
          } else {
            showPersonCardModal(person);
            resolve(null);
          }
        })
        .catch(() => {
          reject('Ocorreu um erro. Tente novamente.');
        });
    });
  };

  const redirectTo = (cardNumber: string) =>
    router.replace(`/pessoas?q=${cardNumber}`);

  const showPersonCardModal = (person: Person) =>
    setPersonModal({ open: true, person });

  const handleClosePersonCardModal = () => {
    setPersonModal({ ...personModal, open: false });
    redirectTo(personModal.person?.CardNumber || '');
  };

  return (
    <Container>
      <PageHeader title={'Cadastro'} />
      {form && <Form form={form} onSubmit={onSubmit} />}
      <PersonCardModal
        {...personModal}
        handleClose={handleClosePersonCardModal}
        newPerson
      />
    </Container>
  );
};

export default PersonPage;
