import {
  BathtubRounded,
  LocalHospitalRounded,
  LocalLaundryServiceRounded,
  RestaurantRounded,
  WcRounded,
  WorkRounded,
} from '@material-ui/icons';

interface Props {
  icon?: string;
}

const Icon = ({ icon }: Props) => {
  switch (icon) {
    case 'work':
      return <WorkRounded />;
    case 'restaurant':
      return <RestaurantRounded />;
    case 'wc':
      return <WcRounded />;
    case 'local-hospital':
      return <LocalHospitalRounded />;
    case 'local-laundry-service':
      return <LocalLaundryServiceRounded />;
    case 'bathtub':
      return <BathtubRounded />;
    default:
      return null;
  }
};

export default Icon;
