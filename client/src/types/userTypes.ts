
type User = {
        username: string
        email: string,
        role: "customer" | "admin"
}


type UserStoreType = {
    user: User | null,
    loading: boolean,
    checkingauth: boolean,
    signUp: (formdata: any) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    checkauth: () => Promise<void>
    checkvalid: (email: string, password: string) => boolean,
    signOut: () => Promise<void>
}

export { UserStoreType, User }