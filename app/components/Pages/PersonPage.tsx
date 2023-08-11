import PeopleService from '#/services/PeopleService';
import { Form as FormType } from '#/types/Forms';
import { PersonCompleteData } from '#/types/People';
import { Container as MuiContainer } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Form from '../Form/Form';
import PageHeader from '../PageHeader';
import PersonCardModal from '../PersonModalCard/PersonCardModal';
import GoToButton from '../GoToButton';

const Container = styled(MuiContainer)`
  && {
    max-width: 600px;
  }
`;

interface Props {
  userId: number;
  personInformation?: PersonCompleteData | null;
  form?: FormType | null;
}

export interface IResult {
  type: string;
  message: string;
}

const PersonPage = ({
  userId,
  personInformation,
  form,
}: Props): ReactElement => {
  const router = useRouter();

  const [personModal, setPersonModal] = useState<{
    person: PersonCompleteData | null;
    open: boolean;
  }>({ open: false, person: null });

  const onSubmit = async (data: { [key: string]: unknown }) => {
    return new Promise<string | null>((resolve, reject) => {
      PeopleService.savePerson(data, userId, personInformation)
        .then((personCompleteData) => {
          if (personInformation?.person.id !== null) {
            router.replace('/pessoas');
            redirectTo(personCompleteData.person?.card_number);
            resolve('Cadastro atualizado com sucesso!');
          } else {
            showPersonCardModal(personCompleteData);
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

  const showPersonCardModal = (person: PersonCompleteData) =>
    setPersonModal({ open: true, person });

  const handleClosePersonCardModal = () => {
    setPersonModal({ ...personModal, open: false });
    redirectTo(personModal.person?.person.card_number || '');
  };

  return (
    <Container>
      <PageHeader title={'Cadastro de Pessoa'} />
      {form && <Form form={form} onSubmit={onSubmit} />}
      <PersonCardModal
        {...personModal}
        handleClose={handleClosePersonCardModal}
        newPerson
      />
      <GoToButton idGoTo="#saveButton" />
    </Container>
  );
};

export default PersonPage;
