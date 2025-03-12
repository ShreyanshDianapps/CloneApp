
export const screenNames = {

    //Authentication Screens
    AuthenticationRouter:'AuthenticationRouter',
    SignUp:'SignUp',
    Login:'Login',
    //Bottom Navigation
    BottomNavigation:'BottomNavigation',
    //Home Screens
    HomeRouter:'HomeRouter',
    MainHomeScreen:'MainHomeScreen',
    //shopScreens
    ShopRouter:'ShopRouter',
    MainShopScreen:'MainShopScreen',
    SelectedCategoryProductScreen:'SelectedCategoryProductScreen',
} as const;
export type ScreenNames = keyof typeof screenNames
