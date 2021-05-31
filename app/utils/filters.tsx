import moment from 'moment';

export class Filter {
  static byThisMonth = (dateProperty: string) => ({
    [`${dateProperty}_gte`]: moment()
      .clone()
      .startOf('month')
      .format('YYYY-MM-DD'),
  });

  static byThisWeek = (dateProperty: string) => ({
    [`${dateProperty}_gte`]: moment()
      .clone()
      .startOf('week')
      .format('YYYY-MM-DD'),
  });
}
