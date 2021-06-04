import { Person } from '#/types/People';
import {
  Avatar,
  Box,
  Grow,
  Modal as TheModal,
  Typography,
  withTheme,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import moment from 'moment';
import styled from 'styled-components';
import TheCard from './Card';

const Modal = styled(TheModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = withTheme(styled(Box)`
  background-color: ${({ theme }) => theme.palette.success.main};
  position: relative;
  border-radius: 16px;
`);

const Card = styled(TheCard)`
  && {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    width: 480px;
    max-width: 90vw;
    position: relative;
    padding: 1.5rem;
  }
`;

const Logo = withTheme(styled(Avatar)`
  && {
    width: 4rem;
    height: 4rem;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
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
  }
`;

const Value = styled(Typography)`
  && {
    font-size: 1em;

    &.bigger {
      font-weight: bold;
      font-size: 2.5em;
    }
  }
`;

const Banner = withTheme(styled(Box)`
  background-color: ${({ theme }) => theme.palette.success.main};
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: .5rem;
  color: #fff;
  font-weight: bold;
  border-radius: 16px 16px 0 0;
  padding: 1.25rem 1.5rem;
  width: 100%;
`);

interface Props {
  open: boolean;
  newPerson: boolean;
  person?: Person | null;
  className?: string;
  handleClose: () => void;
}

const PersonCardModal = ({
  person,
  open,
  newPerson,
  handleClose,
  className,
}: Props) => {
  if (!person) return null;

  const {
    Name,
    CardNumber,
    BirthDate,
    BirthPlace,
    MotherName,
    Cpf,
    GeneralRegister,
    created_at,
  } = person;

  const BithDateFormatted = moment(BirthDate).format('DD/MM/YYYY');

  const CreatedAtFormatted = moment(created_at).format('DD/MM/YYYY');

  return (
    <Modal className={className} onClose={handleClose} open={open}>
      <Grow
        in={open}
        {...(open ? { timeout: 500 } : {})}
      >
        <ModalWrapper>
          {newPerson && (
            <Banner>
              <CheckCircleRounded />
              Cadastro concluído com sucesso!
            </Banner>
          )}
          <Card>
            <Logo alt="Canto da Rua" src="/images/logo.png" />

            <Field>
              <Label>Número</Label>
              <Value className="bigger">{CardNumber}</Value>
            </Field>

            <Field>
              <Label>Nome</Label>
              <Value>{Name}</Value>
            </Field>

            <HalfField>
              <Label>Data de Nascimento</Label>
              <Value>{BithDateFormatted}</Value>
            </HalfField>

            <HalfField>
              <Label>Naturalidade</Label>
              <Value>{BirthPlace}</Value>
            </HalfField>

            <Field>
              <Label>Nome da Mãe</Label>
              <Value>{MotherName || '-'}</Value>
            </Field>

            {Cpf && (
              <HalfField>
                <Label>Documento (CPF)</Label>
                <Value>{Cpf}</Value>
              </HalfField>
            )}

            {!Cpf && GeneralRegister && (
              <HalfField>
                <Label>Documento (RG)</Label>
                <Value>{GeneralRegister}</Value>
              </HalfField>
            )}

            <HalfField>
              <Label>Data de Expedição</Label>
              <Value>{CreatedAtFormatted}</Value>
            </HalfField>
          </Card>
        </ModalWrapper>
      </Grow>
    </Modal>
  );
};

export default PersonCardModal;
