

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
    FilterScreen:'FilterScreen',
    BrandsScreen:'BrandsScreen',
    BottomSheetSortScreen:'BottomSheetSortScreen',
    ProductScreen:'ProductScreen',
    AdditionalInformation:'AdditionalInformation',
    BottomSheetReviwComp:'BottomSheetReviwComp',
    //bag screens
    BagRouter:'BagRouter',
    MyBagScreen:'MyBagScreen'
} as const;
export type ScreenNames = keyof typeof screenNames
