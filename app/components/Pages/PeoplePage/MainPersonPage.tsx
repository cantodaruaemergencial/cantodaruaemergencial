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
import { Box, Button, Container as MuiContainer } from '@mui/material';
import { withTheme } from '@mui/styles';
import { AddCircleRounded } from '@mui/icons-material';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteList, {
  InfiniteListFetchRows,
  InfiniteListRowRenderer,
} from '../../InfiniteList';
import PageHeader from '../../PageHeader';
import Value from '../../Value';
import PersonCard from './PersonCard';
import { useRouter } from 'next/router';

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
  color: #545a68;
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

const DashboardToday = styled(Value)`
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

const MainPersonPage = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const route = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<{
    nameOrCardNumber?: string | null;
  }>({});

  useEffect(
    () =>
      setSelectedFilter({
        nameOrCardNumber: route.query.q as string,
      }),
    [],
  );

  const [todayEntrances, setTodayEntrances] = useState<number | null>();
  const [todayRegisters, setTodayRegisters] = useState<number | null>();
  const [isWaitingRequest, setIsWaitingRequest] = useState(false);

  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalType>({
      title: 'Confirmar entrada',
      open: false,
    });

  const fetchPeople: InfiniteListFetchRows = (startIndex, limit, filter) =>
    PeopleService.get(startIndex, limit, filter);

  const fetchDashboardToday = () =>
    DashboardService.getToday().then(({ entrances, registers }) => {
      setTodayEntrances(entrances);
      setTodayRegisters(registers);
    });

  const onChangeFilter = (value?: string) =>
    setSelectedFilter({ nameOrCardNumber: value });

  const addNewEntrance = (
    person: BasePerson,
    callback: (entrance: Entrance) => void,
  ) => {
    const message = `Deseja confirmar a entrada de **${person.name} (${person.card_number})**?`;

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
    setIsWaitingRequest(true);
    EntrancesService.post(confirmationModal.data.person).then(
      ({ status, data }) => {
        if (status === 200) {
          handleCloseConfirmationModal();
          confirmationModal.data.callback(data);
          fetchDashboardToday();
          setIsWaitingRequest(false);
        } else {
          enqueueSnackbar('Ocorreu um erro ao confirmar a entrada.', {
            variant: 'error',
          });
          setIsWaitingRequest(false);
        }
      },
    );
  };

  const renderControls = () => (
    <Link href="/pessoas/cadastro">
      <AddNew variant="contained" startIcon={<AddCircleRounded />}>
        Nova Pessoa
      </AddNew>
    </Link>
  );

  useEffect(() => {
    fetchDashboardToday();
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
      <ListContainer>
        <SearchBar>
          <Search placeholder="Nome ou cartão" onFilter={onChangeFilter} />
          <DashboardToday
            value={todayEntrances != null ? todayEntrances : '-'}
            label="entradas hoje"
            medium
            alignRight
          />
          <DashboardToday
            value={todayRegisters != null ? todayRegisters : '-'}
            label="cadastros hoje"
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
          <Button
            autoFocus
            onClick={confirmEntrance}
            color="primary"
            disabled={isWaitingRequest}
          >
            Confirmar
          </Button>
        }
      />
    </Container>
  );
};

export default MainPersonPage;
