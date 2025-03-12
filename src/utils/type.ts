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
}
