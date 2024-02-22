export interface BaseStrapiData<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface BaseStrapiDataArray<T> {
  data: {
    id: number;
    attributes: T;
  }[];
}
