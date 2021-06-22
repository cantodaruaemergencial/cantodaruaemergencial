import Layout from '#/components/Layout';
import { Container as MuiContainer } from '@material-ui/core';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader';
import { useRouter } from 'next/dist/client/router';
import { Form as FormType } from '#/types/Forms';
import { useState, useEffect } from 'react';
import Form from '../../components/Form/Form';
import AttendancesService from '#/services/AttendancesService';

const Container = styled(MuiContainer)`
  && {
    max-width: 600px;
  }
`;

const NewServices = () => {
  const [form, setForm] = useState<FormType | null>(null);

  const router = useRouter();

  useEffect(() => {
    const teste = AttendancesService.getAttendancesForm();
    setForm(teste);
  }, []);

  const onSubmit = async (data: { [key: string]: unknown }) => {
    return new Promise<string | null>((resolve, reject) => {
      AttendancesService.saveAttendancesByDay(data)
        .then((result) => {
          if (result !== null) {
            router.replace('/servicos');
            resolve('Serviço atualizado com sucesso!');
          } else {
            resolve(null);
          }
        })
        .catch(() => {
          reject('Ocorreu um erro. Tente novamente.');
        });
    });
  };

  return (
    <Layout title="Cadastro - Canto da Rua">
      <Container>
        <PageHeader title={'Cadastro de Atendimentos'} />
        {form && <Form form={form} onSubmit={onSubmit} />}
      </Container>
    </Layout>
  );
};

export default NewServices;
