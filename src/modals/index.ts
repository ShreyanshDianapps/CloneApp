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
export {
    initialAuthState,
};

