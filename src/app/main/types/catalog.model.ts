export interface CatalogListModel {
  id: string;
  name:string;
}

export interface Response {
  mashzals: CatalogListModel[];
}
