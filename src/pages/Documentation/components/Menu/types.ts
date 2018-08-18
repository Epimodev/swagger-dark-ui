export interface MenuRessource {
  name: string;
  operations: {
    id: string;
    value: {
      method: HttpMethod;
      path: string;
    };
  }[];
}

export interface MenuState {
  filter: string;
}
