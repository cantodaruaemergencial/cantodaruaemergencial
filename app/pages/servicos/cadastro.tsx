import Layout from '#/components/Layout';
import { Box, Container as MuiContainer, Typography } from '@material-ui/core';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader';
import { Form as FormType } from '#/types/Forms';
import { useState, useEffect } from 'react';
import Form from '../../components/Form/Form';
import AttendancesService from '#/services/AttendancesService';
import InfiniteList, {
  InfiniteListFetchRows,
  InfiniteListRowRenderer,
} from '#/components/InfiniteList';
import PeopleService from '#/services/PeopleService';
import SearchField from '#/components/SearchField';
import RegisterServicePersonCard from '#/components/Pages/RegisterServicePage/RegisterServicePersonCard';
import { BasePerson } from '#/types/People';
import { useAuthState } from '#/packages/auth/auth-context';

const Container = styled(MuiContainer)`
  && {
    max-width: 600px;
  }
`;

const SearchLabel = styled(Typography)`
  margin-bottom: 8px;
  font-weight: 600;
`;

const Search = styled(SearchField)`
  flex: 1;
  width: 100%;
`;

const ListWrapper = styled(Box)`
  height: 220px;
  margin: 32px 0px;
`;

const List = styled(InfiniteList)`
  flex: 1;
`;

const NewServices = () => {
  const [form, setForm] = useState<FormType | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<BasePerson | undefined>(
    undefined,
  );
  const [selectedFilter, setSelectedFilter] = useState<{
    nameOrCardNumber?: string | null;
  }>({});

  const { userProfile } = useAuthState();

  const fetchPeople: InfiniteListFetchRows = (startIndex, limit, filter) =>
    PeopleService.get(startIndex, limit, filter);

  useEffect(() => {
    const serviceAttendanceForm =
      AttendancesService.getAttendancesForm(selectedPerson);
    setForm(serviceAttendanceForm);
  }, [selectedPerson]);

  const onSubmit = async (data: { [key: string]: unknown }) => {
    return new Promise<string | null>((resolve, reject) => {
      AttendancesService.saveAttendancesByDay(data, userProfile, selectedPerson)
        .then((result) => {
          if (result !== null) {
            resolve('Serviço atualizado com sucesso!');
            setForm(AttendancesService.getAttendancesForm());
            setSelectedPerson(undefined);
            setSelectedFilter({ nameOrCardNumber: '' });
          } else {
            resolve(null);
          }
        })
        .catch(() => {
          reject('Ocorreu um erro. Tente novamente.');
        });
    });
  };

  const onChangeFilter = (value?: string) =>
    setSelectedFilter({ nameOrCardNumber: value });

  const rowRenderer: InfiniteListRowRenderer = (item, isRowLoaded, props) => {
    return (
      <RegisterServicePersonCard
        item={item}
        isRowLoaded={isRowLoaded}
        props={props}
        selectedPerson={selectedPerson}
        selectPerson={setSelectedPerson}
      />
    );
  };

  return (
    <Layout title="Cadastro - Canto da Rua">
      <Container>
        <PageHeader title={'Cadastro de Atendimentos'} />
        <SearchLabel>Busca a pessoa a ser atendida:</SearchLabel>
        <Search placeholder="Nome ou cartão" onFilter={onChangeFilter} />
        <ListWrapper>
          <List
            fetchRows={fetchPeople}
            rowRenderer={rowRenderer}
            filter={selectedFilter}
          />
        </ListWrapper>
        {form && selectedPerson && <Form form={form} onSubmit={onSubmit} />}
      </Container>
    </Layout>
  );
};

export default NewServices;
