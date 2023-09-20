export interface IItemsResponse {
  status: number;
  message: string;
  data: IItemDetails[];
}

export interface IItemDetails {
  _id: string;
  itemName: string;
  price: number;
  img: string;
}

export interface IBranchResponse {
  status: number;
  message: string;
  data: IBranchDetails[];
}

export interface IBranchDetails {
  _id: string;
  name: string;
}
