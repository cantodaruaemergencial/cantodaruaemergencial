import { Avatar, Box, Container, withTheme, Link } from '@material-ui/core';
import { Instagram, Facebook, InputRounded } from '@material-ui/icons';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import PageHeader from '../../PageHeader';
import BarCard from '#/components/BarCard/BarCard';
import DashboardCard from '#/components/DashboardCard/DashboardCard';
import DoughtnutCard from '#/components/DoughtnutCard/DoughtnutCard';
import TotalListCard from '#/components/TotalListCard/TotalListCard';
import { useAuthState } from '#/packages/auth/auth-context';
// import DashboardService from '#/services/DashboardService';
import { DashboardData } from '#/types/Dashboard';
import { returnBasePathDependingOnEnv } from '#/utils/deploy';

const Logo = styled(Avatar)`
  && {
    width: 5rem;
    height: 5rem;
    margin-right: 1.5rem;
  }
`;

const Title = styled.span`
  && {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const LinkButton = styled.button`
  && {
    width: 150px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 8px 16px;
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    background-color: #563727;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    @media screen and (max-width: 960px) {
      width: 200px;
    }
  }
`;

const DashboardContainer = withTheme(styled(Box)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'people entrances entrances attendances attendances'
    'services services services services services'
    'genders ages ages schoolTrainings schoolTrainings'
    'skinColors homelessness homelessness schoolTrainings schoolTrainings';

  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'people people'
      'entrances attendances'
      'services services'
      'genders ages'
      'skinColors homelessness'
      'schoolTrainings schoolTrainings';
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'people people'
      'entrances entrances'
      'attendances attendances'
      'services services'
      'genders skinColors'
      'ages ages'
      'homelessness homelessness'
      'schoolTrainings schoolTrainings';
  }
`);

const People = styled(DashboardCard)`
  grid-area: people;
`;

const ServiceAttendances = styled(DashboardCard)`
  grid-area: attendances;
`;

const Entrances = styled(DashboardCard)`
  grid-area: entrances;
`;

const Services = styled(TotalListCard)`
  grid-area: services;
`;

const Genders = styled(DoughtnutCard)`
  grid-area: genders;
`;

const Ages = styled(BarCard)`
  grid-area: ages;
`;

const SkinColors = styled(DoughtnutCard)`
  grid-area: skinColors;
`;

const Homelessness = styled(BarCard)`
  grid-area: homelessness;
`;

const SchoolTrainings = styled(BarCard)`
  grid-area: schoolTrainings;
  min-height: 420px;
`;

const DashboardPage = (): ReactElement => {
  const { isLogged } = useAuthState();

  const [dashboardData] = useState<DashboardData>();

  // useEffect(() => {
  //   DashboardService.getDashboardData().then((data) => {
  //     setDashboardData(data);
  //   });
  // }, []);

  if (!dashboardData) return <></>;

  const {
    people,
    entrances,
    serviceAttendances,
    services,
    genders,
    skinColors,
    schoolTrainings,
    ages,
    homelessness,
  } = dashboardData;

  const renderTitle = () => {
    if (isLogged) return 'Dashboard';

    return (
      <Title>
        <Logo src={`${process.env.NEXT_PUBLIC_BUCKET_NAME}/images/logo.png`} />
        Canto da Rua
        <Link
          href="https://www.instagram.com/cantodaruaemergencial/"
          target="_blank"
          style={{ float: 'left' }}
        >
          <Instagram />
        </Link>
        <Link
          href="https://www.facebook.com/comunidadecantodarua"
          target="_blank"
        >
          <Facebook />
        </Link>
      </Title>
    );
  };

  const renderLoginButton = () => {
    if (!isLogged)
      return (
        <Link href={`${returnBasePathDependingOnEnv()}/login`}>
          <LinkButton>
            <InputRounded /> Login
          </LinkButton>
        </Link>
      );
  };

  return (
    <Container>
      <PageHeader title={renderTitle()} sideComponent={renderLoginButton()} />
      <DashboardContainer>
        <People {...people} primary alignCenter />
        <Entrances {...entrances} />
        <ServiceAttendances {...serviceAttendances} />
        <Services {...services} />
        <Genders {...genders} />
        <Ages {...ages} />
        <SkinColors {...skinColors} />
        <Homelessness {...homelessness} />
        <SchoolTrainings {...schoolTrainings} horizontal />
      </DashboardContainer>
    </Container>
  );
};

export default DashboardPage;
