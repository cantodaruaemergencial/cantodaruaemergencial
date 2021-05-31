import Card from '#/components/Card';
import ConfirmationModal from '#/components/ConfirmationModal';
import SearchField from '#/components/SearchField';
import DashboardService from '#/services/DashboardService';
import EntrancesService from '#/services/EntrancesService';
import PeopleService from '#/services/PeopleService';
import { ConfirmationModal as ConfirmationModalType } from '#/types/ConfirmationModal';
import { Entrance } from '#/types/Entrance';
import { BasePerson } from '#/types/People';
import { Shadows } from '#/utils/theme';
import { Box, Button, Container as MuiContainer } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { AddCircleRounded } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteList, {
  InfiniteListFetchRows,
  InfiniteListRowRenderer,
} from '../../InfiniteList';
import PageHeader from '../../PageHeader';
import Value from './../../Value';
import PersonCard from './PersonCard';

const Container = styled(MuiContainer)`
  && {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    height: 100%;
    flex: 1;
  }
`;

const Header = withTheme(styled(PageHeader)``);

const AddNew = styled(Button)`
  grid-area: add-new;
  height: 42px;
`;

const ListContainer = styled(Card)`
  && {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    flex-shrink: 0;
    padding: 0;
  }
`;

const ListWrapper = styled(Box)`
  height: 70vh;
`;

const List = styled(InfiniteList)`
  flex: 1;
`;

const EntrancesToday = styled(Value)`
  margin-left: 1rem;
`;

const SearchBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${Shadows.bottom};
`;

const Search = styled(SearchField)`
  flex: 1;
  max-width: 400px;
`;

const PeoplePage = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const [selectedFilter, setSelectedFilter] = useState({});

  const [todayEntrances, setTodayEntrances] = useState<number | null>();

  const [
    confirmationModal,
    setConfirmationModal,
  ] = useState<ConfirmationModalType>({
    title: 'Confirmar entrada',
    open: false,
  });

  const fetchPeople: InfiniteListFetchRows = (startIndex, limit, filter) =>
    PeopleService.get(startIndex, limit, filter);

  const fetchEntrances = () =>
    DashboardService.getToday().then(({ entrances }) =>
      setTodayEntrances(entrances),
    );

  const onChangeFilter = (value?: string) =>
    setSelectedFilter({ nameOrCardNumber: value });

  const addNewEntrance = (
    person: BasePerson,
    callback: (entrance: Entrance) => void,
  ) => {
    const message = `Deseja confirmar a entrada de ${person.Name}?`;

    setConfirmationModal({
      ...confirmationModal,
      data: {
        person,
        callback,
      },
      message,
      open: true,
    });
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModal({ ...confirmationModal, open: false });
    document.getElementById('search-field')?.focus();
  };

  const confirmEntrance = () => {
    EntrancesService.post(confirmationModal.data.person).then(
      ({ status, data }) => {
        if (status === 200) {
          handleCloseConfirmationModal();
          confirmationModal.data.callback(data);
          fetchEntrances();
        } else {
          enqueueSnackbar('Ocorreu um erro ao confirmar a entrada.', {
            variant: 'error',
          });
        }
      },
    );
  };

  const renderControls = () => (
    <AddNew
      href="/people/new-person"
      variant="contained"
      startIcon={<AddCircleRounded />}
    >
      Nova Pessoa
    </AddNew>
  );

  useEffect(() => {
    fetchEntrances();
  }, []);

  const rowRenderer: InfiniteListRowRenderer = (item, isRowLoaded, props) => (
    <PersonCard
      item={item}
      isRowLoaded={isRowLoaded}
      props={props}
      addNewEntrance={addNewEntrance}
    />
  );

  return (
    <Container>
      <Header title="Pessoas" sideComponent={renderControls()} />
      <ListContainer rounder>
        <SearchBar>
          <Search placeholder="Nome ou cartão" onFilter={onChangeFilter} />
          <EntrancesToday
            value={todayEntrances != null ? todayEntrances : '-'}
            label="entradas hoje"
            medium
            alignRight
          />
        </SearchBar>
        <ListWrapper>
          <List
            fetchRows={fetchPeople}
            rowRenderer={rowRenderer}
            filter={selectedFilter}
          />
        </ListWrapper>
      </ListContainer>
      <ConfirmationModal
        {...confirmationModal}
        handleClose={handleCloseConfirmationModal}
        actions={
          <Button autoFocus onClick={confirmEntrance} color="primary">
            Confirmar
          </Button>
        }
      />
    </Container>
  );
};

export default PeoplePage;
