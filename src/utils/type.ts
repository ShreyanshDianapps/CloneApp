import { Product } from '@cloneApp/modals';
import { NavigatorScreenParams } from '@react-navigation/native';
export type AuthNavigationStack={
    SignUp:undefined,
    Login:undefined
}
//homenaviagtion
export type HomeNavigationStack={
    MainHomeScreen:undefined

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
export type BottomNavigationStack={
    HomeRouter:undefined
    ShopRouter:undefined
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
    HomeRouter:undefined
    //shop
    ShopRouter:undefined
    MainShopScreen:undefined
    SelectedCategoryProductScreen:{url:string,name:string}
    FilterScreen:{ brands:string[],callBack?: (data: number[]) => void };
    BrandsScreen:{brands:string[],callBackBrand?:(data:string[])=>void};
    BottomSheetSortScreen:{data:string[],callBackIndex?:(index:number)=>void,headingText?:string,index?:number}
    ProductScreen:{id:number}
    AdditionalInformation:{data:Product}
    BottomSheetReviwComp:{data:Product}
}
