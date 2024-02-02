import { Button, Container } from '@mui/material';
import { withTheme } from '@mui/styles';
import { AddCircleRounded } from '@mui/icons-material';
import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import PageHeader from '../../PageHeader';

import TotalListCard from '#/components/TotalListCard/TotalListCard';
import DashboardService from '#/services/DashboardService';
import { DashboardData } from '#/types/Dashboard';

const AddNew = styled(Button)`
  grid-area: add-new;
  height: 42px;
`;

const Header = withTheme(styled(PageHeader)``);

const Services = styled(TotalListCard)`
  grid-area: services;
`;

const ServicesPage = (): ReactElement => {
  const [dashboardData, setDashboardData] = useState<DashboardData>();

  useEffect(() => {
    DashboardService.getDashboardData().then((data) => {
      setDashboardData(data);
    });
  }, []);

  if (!dashboardData) return <></>;

  const { services } = dashboardData;

  const renderControls = () => (
    <Link href="/servicos/cadastro">
      <AddNew variant="contained" startIcon={<AddCircleRounded />}>
        Novos Atendimentos
      </AddNew>
    </Link>
  );

  return (
    <Container>
      <Header title="Serviços" sideComponent={renderControls()} />
      <Services {...services} />
    </Container>
  );
};

export default ServicesPage;
