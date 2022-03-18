import { createContext, useContext } from 'react'
import useFirebaseAuth from '../config/auth';
import { User } from 'firebase/auth'
interface AuthUserContextType {
    authUser: null | User,
    loading: boolean
}
const AuthUserContext = createContext<AuthUserContextType>({
    authUser: null,
    loading: true
});

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return <AuthUserContext.Provider value={auth}> {children} </AuthUserContext.Provider>;
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);