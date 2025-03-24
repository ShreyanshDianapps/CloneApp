import { Product } from '@cloneApp/modals';
import { NavigatorScreenParams } from '@react-navigation/native';
export type AuthNavigationStack={
    SignUp:undefined,
    Login:undefined
}
//homenaviagtion
export type HomeNavigationStack={
    MainHomeScreen:undefined
    ProductScreen:{ id: number }
    HarshUi:undefined

}
export type ShopNavigationStack={
    MainShopScreen:undefined
    SelectedCategoryProductScreen:{url:string,name:string}
    FilterScreen:{ brands:string[],callBack?: (data: number[]) => void };
    BrandsScreen:{brands:string[],callBackBrand?:(data:string[])=>void};
    BottomSheetSortScreen:{data:string[],callBackIndex?:(index:number)=>void,headingText?:string,index?:number}
    ProductScreen:{id:number}
    AdditionalInformation:{data:Product}
    BottomSheetReviwComp:{data:Product}
}
export type BagNavigationStack={
    MyBagScreen:undefined
    ProductScreen:{id:number}
}
export type FavNavigationStack={
    MainFavorites:undefined
    BottomSheetSortScreen:{data:string[],callBackIndex?:(index:number)=>void,headingText?:string,index?:number}
    FilterScreen:{ brands:string[],callBack?: (data: number[]) => void };
    BrandsScreen:{brands:string[],callBackBrand?:(data:string[])=>void};
    AdditionalInformation:{data:Product}
    BottomSheetReviwComp:{data:Product}
    ProductScreen:{id:number}
}
export type ProfileNavigationStack={
    MainProfileScreen:undefined,
    OrdersScreen:undefined,
    MyReviewsScreen:undefined
    DetailsScreen:{index:number}
}
export type BottomNavigationStack={
    HomeRouter:undefined
    ShopRouter:undefined
    BagRouter:undefined
    FavoriteRouter:undefined
    ProfileRouter:undefined
}
export type RootNavigationStack={
    //Authenication
    AuthenticationRouter:undefined,
    SignUp:undefined,
    Login:undefined,
    //Bottom Navigation
    BottomNavigation:undefined,
    //home
    MainHomeScreen:undefined,
    HomeRouter:NavigatorScreenParams<HomeNavigationStack>;
    //shop
    ShopRouter:NavigatorScreenParams<ShopNavigationStack>;
    MainShopScreen:undefined
    SelectedCategoryProductScreen:{url:string,name:string}
    FilterScreen:{ brands:string[],callBack?: (data: number[]) => void };
    BrandsScreen:{brands:string[],callBackBrand?:(data:string[])=>void};
    BottomSheetSortScreen:{data:string[],callBackIndex?:(index:number)=>void,headingText?:string,index?:number}
    ProductScreen:{id:number}
    AdditionalInformation:{data:Product}
    BottomSheetReviwComp:{data:Product}
    //bag
    BagRouter:undefined
    MyBagScreen:undefined
    //fav
     MainFavorites:undefined
     FavoriteRouter:undefined
     //harsh
     HarshUi:undefined//
     //profile
     ProfileRouter:undefined

}
