export declare interface LoginSettings {
    /** The image URL of the logo to be displayed */
    logo: {
        light: string,
        dark: string,
    }
    /** The main heading to be shown on the login page */
    heading: {
        login: string,
        signup: string
    },
    /** The subtext to be shown on the login page */
    text?: {
        login: string,
        signup: string
    },
    /** Whether users can signup or not */
    signup_enabled: boolean,
    /** The list of auth providers that are enabled along with their order */
    providers: LoginProvider[]
}

export declare type LoginProvider = 'password' | 'google' | 'facebook' | 'twitter' | 'github' | 'phone' | 'magic_link';