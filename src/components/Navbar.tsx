import { BsCart3, BsHeart } from "react-icons/bs"
import BorderedButton from "./Buttons/BorderedButton"
import BorderlessButton from "./Buttons/BorderlessButton"

const Navbar = () => {
    return (
    <nav className="bg-black w-screen p-2 flex justify-between items-center">
        <h1 className='text-xl font-bold text-white'>My Image Search</h1>

        <ul className="flex items-center space-x-2">
        <BorderlessButton className="text-white flex items-center space-x-2"><BsHeart className="text-lg"/> <span>Sign in</span></BorderlessButton>
        <BorderlessButton className="text-white flex items-center space-x-2"><BsCart3 className="text-lg"/> <span>Sign in</span></BorderlessButton>
        <BorderedButton className="text-white">Sign in</BorderedButton>
        </ul>
    </nav>
  )
}

export default Navbar