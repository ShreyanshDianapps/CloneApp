// Define a common type for authentication data
export type authenticateData = {
    email: string;
    password: string;
};
export type SignUpObject={
    name:string,
    email:string,
    password:string,
}


// Define a type for Google sign-up data
export type userState={
    name:string,
    email:string,
    userId:string
}

// Default Google signup data (initial state)
interface AuthState{
    loading:boolean,
    isAuthenticate:boolean,
    user:userState| null,
}
const initialAuthState:AuthState = {
    isAuthenticate:false,
    loading:false,
    user:null,
};
export type CategoriesData={
    slug:string,
    name:string,
    url:string
}
export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
      rating: number;
      comment: string;
      date: string; // ISO Date string
      reviewerName: string;
      reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string; // ISO Date string
      updatedAt: string; // ISO Date string
      barcode: string;
      qrCode: string;
    };
    images: string[];
    thumbnail: string;
  };
  
interface ShopState{
    loading:boolean,
    CategoriesData:CategoriesData[]|[]
    Product:Product[]|[]
}
const initialShopState:ShopState={
        loading:false,
        CategoriesData:[],
        Product:[]
}
export {
    initialAuthState,
    initialShopState
};

