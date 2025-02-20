import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar({ token, handleLogout }) {
  return (
    <nav className="text-yellow-400 bg-amber-50 backdrop:blur-sm p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">QuirkyRoomie</Link>
      </div>
      <div className="flex text-amber-50 gap-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  token: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};
