import { Box, withTheme } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardHeader from '../CardHeader';
import Icon from '../Icon';
import Selector, { SelectorOption } from '../Selector';
import Value from '../Value';

import {
  DashboardTotalByCategoryAndHistoric,
  DashboardTotalHistoricalListCard,
} from '#/types/Dashboard';

const List = withTheme(styled(Box)`
  display: grid;
  column-gap: 1rem;
  row-gap: 4rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 2rem 0;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: repeat(2, 1fr);
  }
`);

const Item = styled(Box)`
  display: flex;
  align-items: center;
`;

const IconWrapper = withTheme(styled(Box)`
  && {
    margin-right: 1rem;
    background-color: ${({ theme }) => `${theme.palette.primary.main}30`};
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex: 0 0 auto;
  }
`);

const ValueItem = styled(Value)`
  && {
    font-size: 0.7rem;

    .MuiTypography-colorTextSecondary {
      font-size: 0.8rem;
      line-height: 1.3;
      margin-top: 4px;
    }
  }
`;

interface Props extends DashboardTotalHistoricalListCard {
  className?: string;
}

const TotalListCard = ({ values, className }: Props) => {
  const [property, setProperty] = useState<
    keyof DashboardTotalByCategoryAndHistoric
  >('total');

  const renderSelector = () => {
    const options = [
      { id: 0, label: 'Semana', value: 'weekTotal' },
      { id: 1, label: 'Mês', value: 'monthTotal' },
      { id: 2, label: 'Total', value: 'total' },
    ];

    const onSelect = (option: SelectorOption) => setProperty(option.value);

    return (
      <Selector
        options={options}
        onSelect={onSelect}
        inititalValue={options[2]}
      />
    );
  };

  const renderValue = (value: DashboardTotalByCategoryAndHistoric) => (
    <Item key={value.name}>
      <IconWrapper>
        <Icon icon={value.icon} />
      </IconWrapper>
      <ValueItem value={+(value[property] || 0)} label={value.name} />
    </Item>
  );

  return (
    <Card className={className} rounder>
      <CardHeader title="Serviços" sideComponent={renderSelector()} />
      <List>{values && values.map(renderValue)}</List>
    </Card>
  );
};

export default TotalListCard;
