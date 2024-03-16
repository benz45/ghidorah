export interface CreateStoreRequest {
  storeName:   string;
  detail:      string;
  storeImages?: StoreImage[];
  address:     Address;
}

export interface Address {
  tal:         string;
  houseNumber: string;
  subdistrict: string;
  district:    string;
  province:    string;
  postalcode:  number;
  active?:      boolean;
}

export interface StoreImage {
  key:              string;
  storeImageTypeId: number;
}
