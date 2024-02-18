type user  = {
    name:string | number,
    phone:number,
    password:string | number
}
export interface api {
    
     test:{
        createUser:function (user)
     }
}