import Card from '#/components/Card';
import { Container as MuiContainer, Button as MuiButton, InputBase, withTheme } from '@material-ui/core';
import { ReactElement } from 'react';
import styled from 'styled-components';
import PageHeader from '../../PageHeader';
import ReportsService from '#/services/ReportsService';

const Header = withTheme(styled(PageHeader)``);

const Container = styled(MuiContainer)`
  && {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    height: 100%;
    flex: 1;
    border-radius: 0;
  }
`;

const ListContainer = styled(Card)`
  && {
    display: flex;
    flex-direction: row;
    margin-bottom: 3rem;
    flex-shrink: 0;
    padding: 1rem;
    border-radius: 0;
  }
`;

const Input = styled(InputBase)`
  && {
    width: 24%;
  }
`;

const Button = styled(MuiButton)`
  && {
    width: 24%;
    margin-left: auto;
    order: 2;
  }
`;

const ReportsPage = (): ReactElement => {

  const getPeople = () => {
    ReportsService.getPeople();
  };

  return (
    <Container>
      <Header title="Relatórios" />
      <ListContainer>
        <Input
          id="month-month"
          placeholder="Mês (MM)"
          format="99"
        />
        <Input
          id="month-year"
          placeholder="Ano (AAAA)"
        />
        <Button variant="contained" color="primary" onClick={getPeople}>
          Relatório Mensal
        </Button>
      </ListContainer>

    </Container>
  );
};

export default ReportsPage;
