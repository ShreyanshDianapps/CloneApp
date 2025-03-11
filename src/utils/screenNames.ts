

export const screenNames = {
    //Authentication Screens
    AuthenticationRouter:'AuthenticationRouter',
    SignUp:'SignUp',
    Login:'Login',
} as const;
export type ScreenNames = keyof typeof screenNames
