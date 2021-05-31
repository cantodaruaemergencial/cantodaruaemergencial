import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
} from '@material-ui/core';
import { ReactElement, ReactNode } from 'react';

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
      <Typography gutterBottom>{message}</Typography>
    </DialogContent>
    <DialogActions>{actions}</DialogActions>
  </Dialog>
);

export default ConfirmationModal;
