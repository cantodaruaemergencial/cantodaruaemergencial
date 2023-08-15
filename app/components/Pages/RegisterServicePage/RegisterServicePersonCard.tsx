import Chip from '#/components/Chip';
import { BasePerson, PersonCompleteData } from '#/types/People';
import { Box, Button, Typography, withTheme } from '@material-ui/core';
import { AddCircleRounded, InfoRounded } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { ReactElement, useState } from 'react';
import { ListRowProps } from 'react-virtualized';
import styled from 'styled-components';
import TheTag from './../../Tag';
import PersonCardModal from '#/components/PersonModalCard/PersonCardModal';
import PeopleService from '#/services/PeopleService';

const PersonWrapper = styled(Box)<{ backgroundColor?: string }>`
  flex: 0 0 auto;
  height: 100%;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
`;

const PersonBox = withTheme(styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    flex-direction: column;
    align-items: stretch;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`);

const Info = withTheme(styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin-bottom: 0.75rem;
  }
`);

const Title = withTheme(styled(Typography)`
  && {
    font-weight: 600;

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const PersonInfo = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 0.75rem;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    width: 90%;
  }
`);

const Options = styled(Box)`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const Tag = styled(TheTag)`
  min-width: 48px;
`;

interface Props {
  item: BasePerson;
  isRowLoaded: boolean;
  props: ListRowProps;
  selectedPerson?: BasePerson;
  selectPerson: (person: BasePerson) => void;
}

const RegisterServicePersonCard = ({
  item,
  isRowLoaded,
  selectedPerson,
  selectPerson,
  props: { key, index },
}: Props): ReactElement => {
  const renderSkeleton = () => (
    <PersonWrapper key={`${key}-${index}-skeleton`}>
      <PersonBox condensed>
        <Info>
          <Skeleton variant="rect" width={64} height={24} />
          <PersonInfo>
            <Title variant="body2">
              <Skeleton variant="text" width={160} />
            </Title>
          </PersonInfo>
        </Info>
        <Options>
          <Chip loading />
          <Skeleton variant="rect" width={95} height={27} />
        </Options>
      </PersonBox>
    </PersonWrapper>
  );

  if (!isRowLoaded) return renderSkeleton();

  const {
    id: Id,
    name: Name,
    social_name: SocialName,
    card_number: CardNumber,
  } = item;

  const [personModal, setPersonModal] = useState<{
    personCompleteData: PersonCompleteData | null;
    open: boolean;
  }>({ open: false, personCompleteData: null });

  const showPersonCardModal = (personCompleteData: PersonCompleteData) =>
    setPersonModal({ open: true, personCompleteData });

  const handleClosePersonCardModal = () => {
    setPersonModal({ ...personModal, open: false });
  };

  return (
    <PersonWrapper
      key={Id}
      backgroundColor={Id === selectedPerson?.id ? '#80f47e' : 'transparent'}
    >
      <PersonBox condensed>
        <Info>
          <Tag label={CardNumber} />
          <PersonInfo>
            <Title variant="body2">{Name}</Title>
            {SocialName && (
              <Typography variant="caption">{SocialName}</Typography>
            )}
          </PersonInfo>
        </Info>
        <Options>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddCircleRounded />}
            onClick={() => selectPerson(item)}
          >
            Selecionar
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<InfoRounded />}
            onClick={async () => {
              const people = await PeopleService.getPersonCompleteData(item.id);
              showPersonCardModal(people);
            }}
          >
            Cartão
          </Button>
        </Options>
      </PersonBox>
      <PersonCardModal
        {...personModal}
        handleClose={handleClosePersonCardModal}
        newPerson={false}
      />
    </PersonWrapper>
  );
};

export default RegisterServicePersonCard;
