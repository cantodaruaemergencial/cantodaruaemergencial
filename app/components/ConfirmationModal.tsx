import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import { ConfirmationModal as ConfirmationModalType } from '#/types/ConfirmationModal';

interface Props extends ConfirmationModalType {
  className?: string;
  handleClose: () => void;
  actions: ReactNode;
}

const ConfirmationModal = ({
  title,
  message,
  open,
  handleClose,
  actions,
  className,
}: Props): ReactElement => (
  <Dialog
    className={className}
    onClose={handleClose}
    open={open}
    TransitionComponent={Fade}
    maxWidth="xs"
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>
        <ReactMarkdown>{message || ''}</ReactMarkdown>
      </Typography>
    </DialogContent>
    <DialogActions>{actions}</DialogActions>
  </Dialog>
);

export default ConfirmationModal;
