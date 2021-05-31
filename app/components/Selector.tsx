import { Box, Button, withTheme } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

const Container = withTheme(styled(Box)`
  border: 1px solid ${({ theme }) => `${theme.palette.primary.main}c2`};
  border-radius: 16px;
`);

const Option = withTheme(styled(Button)`
  && {
    font-size: 0.7rem;
    font-weight: 700;
    border-right: 1px solid;
    border-radius: 0;
    padding: 4px 12px;
    color: ${({ theme }) => `${theme.palette.primary.main}c2`};

    &:first-child {
      border-radius: 16px 0 0 16px;
    }

    &:last-child {
      border-right: none;
      border-radius: 0 16px 16px 0;
    }

    &.active {
      background-color: ${({ theme }) => `${theme.palette.primary.main}c2`};
      color: #fff;
    }
  }
`);

export interface SelectorOption {
  id: number;
  label: string;
  value: any;
}

interface Props {
  inititalValue: SelectorOption;
  options: SelectorOption[];
  onSelect: (option: SelectorOption) => void;
  className?: string;
}

const Selector = ({ inititalValue, options, onSelect, className }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SelectorOption>(
    inititalValue,
  );

  const handleSelection = (option: SelectorOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const renderOption = (option: SelectorOption) => (
    <Option
      key={option.id}
      onClick={() => handleSelection(option)}
      className={clsx({ active: option.id === selectedOption.id })}
    >
      {option.label}
    </Option>
  );

  return (
    <Container className={className}>{options.map(renderOption)}</Container>
  );
};

export default Selector;
