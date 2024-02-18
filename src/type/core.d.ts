declare global {
    // function createUser(params: ):void
    export interface apilist {
        test: {
            getUser: getUser
        }
    }
    interface  getUser{
        name: string | number,
        phone: number,
        password: string | number
    }
}