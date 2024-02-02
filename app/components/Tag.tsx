import { Color } from '#/types/Color';
import { Box } from '@mui/material';
import { withTheme } from '@mui/styles';
import clsx from 'clsx';
import { ReactElement } from 'react';
import styled from 'styled-components';

const CustomTag = withTheme(styled(Box)`
  && {
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
    font-size: 0.8rem;
  }

  color: rgba(0, 0, 0, 0.87);
  background-color: #e0e0e0;

  &.success {
    background-color: ${({ theme }) => `${theme.palette.success.light}30`};
    color: ${({ theme }) => theme.palette.success.dark};
  }

  &.error {
    background-color: ${({ theme }) => `${theme.palette.error.light}30`};
    color: ${({ theme }) => theme.palette.error.dark};
  }

  &.info {
    background-color: ${({ theme }) => `${theme.palette.info.light}30`};
    color: ${({ theme }) => theme.palette.info.dark};
  }
`);

interface Props {
  label: string;
  color?: Color;
  className?: string;
}

const Tag = ({ label, color, className }: Props): ReactElement => {
  const getClassColor = () => ({
    default: Color.default === color,
    success: Color.success === color,
    error: Color.error === color,
    info: Color.info === color,
    disabled: Color.disabled === color,
  });

  return (
    <CustomTag className={clsx(className, getClassColor())}>{label}</CustomTag>
  );
};

export default Tag;
