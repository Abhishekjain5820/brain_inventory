
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const {loggedInUser} =useAuth()
  return (
    <div>
       
        {
          loggedInUser?(<h1 className="text-center font-bold items-center">{`Welcome ${loggedInUser}  to  Chat App`}</h1>):(
            <h1 className="text-center font-bold items-center">Login to chat with a Friend</h1>
          )
        }
        
    </div>
  )
}

export default Home