import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardHeader from '../CardHeader';
import Value from '../Value';

import BarCardChart from './BarCardChart';

import { DashboardChartCard } from '#/types/Dashboard';
import { Format } from '#/types/Format';

const DashCard = styled(Card)`
  && {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Chart = styled(BarCardChart)`
  flex: 1;
  min-height: 100px;
  width: 100%;
`;

interface Props extends DashboardChartCard {
  format?: Format;
  horizontal?: boolean;
  className?: string;
}

const BarCard = ({
  label,
  description,
  values,
  average,
  format = Format.number,
  horizontal = false,
  className,
}: Props) => (
  <DashCard className={className} rounder>
    <Header>
      <CardHeader
        title={label}
        description={description}
        sideComponent={
          average != null && (
            <Value value={average || 0} label="média" small inline />
          )
        }
      />
    </Header>
    {values && (
      <Chart values={values} format={format} horizontal={horizontal} />
    )}
  </DashCard>
);

export default BarCard;
