import UserInfo from "./Userinfo";


export function Fetchusers({user}:any){
    return(
        <div className='users' id=''>
      	{user.map((p:any)=>(
				<UserInfo users={p}/>
			))}
           
        </div>
    )
}