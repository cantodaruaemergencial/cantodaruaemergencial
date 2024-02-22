import { Box, Tooltip, Typography } from '@mui/material';
import { withTheme } from '@mui/styles';
import Cancel from '@mui/icons-material/Cancel';
import Check from '@mui/icons-material/Check';
import { TimelineOppositeContent } from '@mui/lab';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { PersonHistory } from '#/types/PersonHistory';
import { PastoralDeRuaServiceAttendance } from '#/types/PastoralServiceAttendance';
import { Entrance } from '#/types/Entrance';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import moment, { Moment } from 'moment';
import { listHistoryData } from './ListHistoryPageUtils';
import { FormTypes } from '#/components/PersonModalCard/PersonModalCardUtils';

const ListHistoryWrapper = withTheme(styled(Box)`
  display: grid;
  grid-template-columns: 400px 1fr;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: flex;
    flex-direction: column;
  }
`);

const Wrapper = styled(Box)`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

const OuterSectionWrapper = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
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

const SectionWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Title = withTheme(styled(Typography)`
  && {
    font-weight: 600;
    font-size: 24px;

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const Description = withTheme(styled(Typography)`
  && {
    font-weight: 500;
    font-size: 18px;

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const TimelineWrapper = withTheme(styled(Timeline)`
  display: flex;
  flex-direction: column;

  width: 100%;
`);

const TimelineItemWrapper = withTheme(styled(TimelineItem)`
  min-height: 570px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    min-height: 100%;
  }
`);

const ShorterTimelineItemWrapper = withTheme(styled(TimelineItem)`
  min-height: 100px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    min-height: 100%;
  }
`);

const Field = withTheme(styled(Box)`
  grid-column: 1 / 3;
  position: relative;
  border-radius: 4px;
`);

const HalfField = styled(Field)`
  grid-column: auto;
`;

const Label = styled(Typography)`
  && {
    font-size: 0.7em;
    font-weight: bold;
    text-align: left;
  }
`;

const Value = styled(Typography)`
  && {
    font-size: 1em;
    max-width: 120px;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.bigger {
      font-weight: bold;
      font-size: 2.5em;
    }
  }
`;

const DateText = styled(Typography)`
  && {
    font-size: 1.5;
    font-weight: bold;
  }
`;

const CustomTooltip = styled(Tooltip)`
  && {
    font-size: 1em;
  }
`;

interface Props {
  item: PersonHistory;
}

const ListHistoryPage = ({ item }: Props): ReactElement => {
  const { attendances, entrances } = item;

  const formatDate = (dateValue: Date | Moment, onlyDate: boolean = false) =>
    onlyDate
      ? moment(dateValue).format('DD-MM-YYYY')
      : moment(dateValue).format('DD-MM-YYYY HH:mm:ss');

  const renderAttendances = (
    personAttendances: PastoralDeRuaServiceAttendance[],
  ) => {
    return (
      <SectionWrapper>
        <Title>Atendimentos ({personAttendances.length})</Title>
        <TimelineWrapper align="alternate">
          {personAttendances.length === 0 ? (
            <Description>Não há dados cadastrados</Description>
          ) : (
            personAttendances?.map((pa, index) => (
              <TimelineItemWrapper>
                <TimelineOppositeContent>
                  <DateText variant="body2">
                    {formatDate(pa.attendance_date, true)}
                  </DateText>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    variant={
                      index !== personAttendances.length - 1
                        ? 'default'
                        : 'outlined'
                    }
                  >
                    <AddLocationIcon />
                  </TimelineDot>
                  {index !== personAttendances.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Wrapper key={pa.id}>
                    {listHistoryData(pa).map((i) => (
                      <HalfField>
                        <Label>{i.label}</Label>
                        {i.type === FormTypes.bool ? (
                          i.value ? (
                            <Check color="secondary" />
                          ) : (
                            <Cancel color="error" />
                          )
                        ) : (
                          <CustomTooltip title={i.value?.toString() || ''}>
                            <Value>{i.value?.toString() || '-'}</Value>
                          </CustomTooltip>
                        )}
                      </HalfField>
                    ))}
                  </Wrapper>
                </TimelineContent>
              </TimelineItemWrapper>
            ))
          )}
        </TimelineWrapper>
      </SectionWrapper>
    );
  };

  const renderEntrances = (personEntrances: Entrance[]) => {
    return (
      <SectionWrapper>
        <Title>Entradas ({personEntrances.length})</Title>
        <TimelineWrapper align="alternate">
          {personEntrances.length === 0 ? (
            <Description>Não há dados cadastrados</Description>
          ) : (
            personEntrances?.map((pe, index) => (
              <ShorterTimelineItemWrapper>
                <TimelineSeparator>
                  <TimelineDot
                    variant={
                      index !== personEntrances.length - 1
                        ? 'default'
                        : 'outlined'
                    }
                  >
                    <DirectionsRunIcon />
                  </TimelineDot>
                  {index !== personEntrances.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent>{formatDate(pe.date)}</TimelineContent>
              </ShorterTimelineItemWrapper>
            ))
          )}
        </TimelineWrapper>
      </SectionWrapper>
    );
  };

  return (
    <ListHistoryWrapper>
      <OuterSectionWrapper>{renderEntrances(entrances)}</OuterSectionWrapper>
      <OuterSectionWrapper>
        {renderAttendances(attendances)}
      </OuterSectionWrapper>
    </ListHistoryWrapper>
  );
};

export default ListHistoryPage;
