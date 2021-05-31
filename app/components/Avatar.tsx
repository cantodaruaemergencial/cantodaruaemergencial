import { Avatar as MuiAvatar } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import initials from 'initials';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { Color } from '#/types/Color';

const CustomAvatar = withTheme(styled(MuiAvatar)`
  && {
    flex: 0 0 auto;
  }

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
  name: string;
  color?: Color;
  className?: string;
}

const Avatar = ({ name, color, className }: Props): ReactElement => {
  let label = initials(name);
  label = `${label.slice(0, 1)}${label.slice(label.length - 1, label.length)}`;

  const getClassColor = () => ({
    default: Color.default === color,
    success: Color.success === color,
    error: Color.error === color,
    info: Color.info === color,
    disabled: Color.disabled === color,
  });

  return (
    <CustomAvatar className={clsx(className, getClassColor())}>
      {label}
    </CustomAvatar>
  );
};

export default Avatar;
