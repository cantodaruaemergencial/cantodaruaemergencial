import {
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  TextField as MuiTextField,
  Tooltip,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DatePicker as DatePickerComponent } from '@mui/x-date-pickers';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import styled from 'styled-components';

import { FieldType, FormField as FormFieldType } from '#/types/Forms';
import { RulesMessages } from '#/utils/rules-messages';
import dayjs from 'dayjs';

const Container = styled(Box)`
  margin-bottom: 1.5rem;
`;

const TextField = styled(MuiTextField)`
  width: 100%;
`;

const DatePicker = styled(DatePickerComponent)`
  width: 100%;

  .MuiInputAdornment-root {
    display: none;
  }
`;

const InfoIcon = styled(InfoOutlinedIcon)`
  color: rgba(0, 0, 0, 0.4);
`;

interface Props {
  className?: string;
  field: FormFieldType;
  control: Control<FieldValues> | undefined;
}

interface RenderType {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

const FormField = ({
  field: {
    property,
    label,
    description,
    type,
    options,
    rules,
    inputConfig,
    dateConfig,
    disabled,
  },
  control,
  className,
}: Props) => {
  const formatedLabel = label + (rules?.required ? ' *' : '');

  const getErrorMessage = (error?: FieldError) => {
    return error ? error.message || RulesMessages()[error.type] || null : null;
  };

  const renderTooltip = () =>
    !description ? null : (
      <InputAdornment position="end">
        <Tooltip title={description || ''}>
          <InfoIcon fontSize="small" />
        </Tooltip>
      </InputAdornment>
    );

  const renderInput = ({ field, fieldState: { error } }: RenderType) => {
    const textFieldType = type === FieldType.number ? 'number' : 'text';

    return (
      <TextField
        {...field}
        label={formatedLabel}
        type={textFieldType}
        variant="outlined"
        error={!!error}
        helperText={getErrorMessage(error)}
        disabled={disabled === true}
        inputProps={{
          maxLength: inputConfig?.maxLength,
        }}
        InputProps={{
          endAdornment: renderTooltip(),
        }}
      />
    );
  };

  const renderSelect = ({ field, fieldState: { error } }: RenderType) => {
    const multiple = type === FieldType.selectMultiple;

    return (
      <TextField
        {...field}
        label={formatedLabel}
        variant="outlined"
        error={!!error}
        helperText={getErrorMessage(error)}
        SelectProps={{ multiple }}
        select
      >
        {options?.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const renderDatePicker = ({ field }: RenderType) => {
    return (
      <DatePicker
        {...field}
        label={formatedLabel}
        maxDate={dayjs()}
        format="dd/MM/yyyy"
        disableFuture={dateConfig?.disableFuture || true}
        disabled={disabled}
      />
    );
  };

  const renderBoolean = ({ field }: RenderType) => (
    <FormControlLabel
      control={
        <Checkbox {...field} color="primary" checked={field?.value === true} />
      }
      label={formatedLabel}
    />
  );

  const getRender = () => {
    switch (type) {
      case FieldType.boolean:
        return renderBoolean;
      case FieldType.select:
      case FieldType.selectMultiple:
        return renderSelect;
      case FieldType.date:
        return renderDatePicker;
      case FieldType.number:
      case FieldType.input:
      default:
        return renderInput;
    }
  };

  return (
    <Container className={className}>
      <Controller
        name={property}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => getRender()({ field, fieldState })}
      />
    </Container>
  );
};

export default FormField;
