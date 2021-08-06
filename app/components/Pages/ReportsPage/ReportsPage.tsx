import { useState } from 'react';
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

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const getMonthly = () => {
    if (month === '' || year === '') {
      alert('Preencha mês e ano!');
      return;
    }
    ReportsService.getMonthly(month, year);
  };

  const getPeople = () => {
    if (from === '' || to === '') {
      alert('Preencha o número dos cartões!');
      return;
    }
    ReportsService.getPeople(from, to);
  }

  return (
    <Container>
      <Header title="Relatórios" />
      <ListContainer>
        <Input
          id="monthly_month"
          placeholder="Mês (MM)"
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <Input
          id="monthly_year"
          placeholder="Ano (AAAA)"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={getMonthly}>
          Relatório Mensal
        </Button>
      </ListContainer>
      <ListContainer>
        <Input
          id="people_from"
          placeholder="Do cartão"
          type="number"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          id="people_to"
          placeholder="Até o cartão"
          type="number"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={getPeople}>
          Relatório de Pessoas
        </Button>
      </ListContainer>
    </Container>
  );
};

export default ReportsPage;
