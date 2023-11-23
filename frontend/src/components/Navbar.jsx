
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          ChatApp
        </Link>

        {/* Login/Register Buttons */}
        <div>
          <Link to="/login" className="text-white mr-4">
            Login
          </Link>
          <Link to="/register" className="text-white">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
