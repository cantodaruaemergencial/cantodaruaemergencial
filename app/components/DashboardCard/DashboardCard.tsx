import { Box, withTheme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardHeader from '../CardHeader';
import Value from '../Value';

import DashboardCardChart from './DashboardCardChart';

import { DashboardCard as DashboardCardInterface } from '#/types/Dashboard';
import { Format } from '#/types/Format';

const DashCard = styled(Card)`
  && {
    padding: 0;
  }
`;

const Numbers = withTheme(styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    flex-direction: column;
    align-items: flex-start;
  }

  &.alignCenter {
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
`);

const Header = styled(CardHeader)`
  && {
    margin-bottom: 0.5rem;
  }
`;

const Chart = styled(DashboardCardChart)`
  flex: 1;
  height: 100px;
  width: 100%;
`;

const OtherValues = withTheme(styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: flex-end;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: 1fr 1fr;
    justify-items: flex-start;
    grid-gap: 0.75rem;
    margin-top: 1rem;
  }
`);

const OtherValue = styled(Value)``;

type OtherValueType = { value: number; label: string };

interface Props extends DashboardCardInterface {
  primary?: boolean;
  alignCenter?: boolean;
  className?: string;
}

const DashboardCard = ({
  label,
  value,
  format = Format.number,
  primary = false,
  alignCenter = false,
  otherValues,
  historicalValues,
  className,
}: Props) => {
  const renderOtherValue = (otherValue: OtherValueType) => (
    <OtherValue
      key={otherValue.label}
      format={format}
      value={otherValue.value}
      label={otherValue.label}
      small
      inline
    />
  );

  return (
    <DashCard className={className} rounder primary={primary}>
      <Numbers className={clsx({ alignCenter })}>
        <Box>
          <Header title={label} contrast={primary} />
          <Value
            format={format}
            value={value}
            light={primary}
            alignCenter={alignCenter}
          />
        </Box>
        {otherValues && (
          <OtherValues>{otherValues.map(renderOtherValue)}</OtherValues>
        )}
      </Numbers>
      {historicalValues && <Chart values={historicalValues} format={format} />}
    </DashCard>
  );
};

export default DashboardCard;
