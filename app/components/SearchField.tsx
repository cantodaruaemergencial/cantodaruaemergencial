import { Box, InputBase } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled(Box)`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  grid-area: search;

  .MuiSvgIcon-root {
    margin: 0 0.5rem;
    fill: darkgray;
  }
`;

const Input = styled(InputBase)`
  width: 100%;
`;

interface Props {
  placeholder: string;
  className?: string;
  onFilter: (value?: string) => void;
}

const SearchField = ({ placeholder, onFilter, className }: Props) => {
  const onKeyDown = ({ key, target: { value } }: any) => {
    if (key === 'Enter') {
      onFilter(value);
    }
  };

  return (
    <Container className={className}>
      <Input
        id="search-field"
        placeholder={placeholder}
        startAdornment={<SearchRounded />}
        onKeyDown={(e) => onKeyDown(e)}
        onFocus={(e) => e.target.select()}
        autoFocus
      />
    </Container>
  );
};

export default SearchField;
