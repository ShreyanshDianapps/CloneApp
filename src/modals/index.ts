import { OrdersData } from '@cloneApp/modules/bag/myBagAction';

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

export type Orders={
    items:OrdersData,
    orderNumber:string,
    createdAt:Date

}
// Define a type for Google sign-up data
export type userState={
    name:string,
    email:string,
    userId:string,

}

// Default Google signup data (initial state)
interface AuthState{
    isLogin:boolean;
    loading:boolean,
    isAuthenticate:boolean,
    user:userState| null,
    language:string
}
const initialAuthState:AuthState = {
    isLogin:false,
    isAuthenticate:false,
    loading:false,
    user:null,
    language:'en'
};
//categories data
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
//filterd data type
export type FilteredData={
    priceRange:number[];
    ratingRange:number[];
    brands:string[]
}
export type AddProduct={
    Product:Product
    userId:string,
    quantity:number
}
export type Review={
    userId:string,
    Product:Product,
    ratings:number,
    comment:string,
}
export type UpdateBagData={
    productId:number,
    quantity:number
}
interface ShopState{
    loading:boolean,
    CategoriesData:CategoriesData[]|[]
    Product:Product[]|[]
    Filter: FilteredData|null
    ProductData:Product|null
    BagData: AddProduct[];
}

const initialShopState:ShopState = {
        loading:false,
        CategoriesData:[],
        Product:[],
        Filter: null,
        ProductData:null,
        BagData:[],

};
interface HomeState{
    loading:boolean
    ProductsData:Product[]|[]
}

const initialHomeState:HomeState = {
    loading:false,
    ProductsData:[],
};
interface FavoritesState{
    loading:boolean
    Favorites:number[]
    FavoritesData:Product[]
    Filter: FilteredData|null
}
const initialFavoriteState:FavoritesState = {
    loading:false,
    Favorites:[],
    FavoritesData:[],
    Filter: null,
};

interface ProfileState{
    loading:boolean,
    MyOrder:Orders[],
    MyReviews:Review[]
}
const initialProfileState:ProfileState = {
    loading:false,
    MyOrder:[],
    MyReviews:[],

};
export {
    initialAuthState,
    initialShopState,
    initialHomeState,
    initialFavoriteState,
    initialProfileState,
};

