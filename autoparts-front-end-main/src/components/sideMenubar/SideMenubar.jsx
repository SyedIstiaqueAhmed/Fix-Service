import { Link } from "react-router-dom";

const SideMenubar = () => {
  return (
    <div className="text-white m-3">
      <li className="hover:bg-white hover:text-gray-900 border-b list-none p-2 hover:rounded-md duration-300">
        <Link className="px-4" to="/">
          Home
        </Link>
      </li>

      <li className="hover:bg-white hover:text-gray-900 border-b list-none p-2 hover:rounded-md duration-300">
      <Link className="px-4" to="http://localhost/view/2PDIS.html">
         Find Mechanics
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"></a></Link>
      </li>
      <li className="hover:bg-white hover:text-gray-900 border-b list-none p-2 hover:rounded-md duration-300">
        <Link className="px-4" to="http://localhost/view/ShowMechanics.html">
          Mechanic List
        </Link>
      </li>
      <li className="hover:bg-white hover:text-gray-900 border-b list-none p-2 hover:rounded-md duration-300">
        <Link className="px-4" to="http://localhost/view/City.html">
          Search  Mechanic 
        </Link>
      </li>
      <li className="hover:bg-white hover:text-gray-900 border-b list-none p-2 hover:rounded-md duration-300">
        <Link className="px-4" to="http://localhost/view/login.html">
          Logout
        </Link>
      </li>
    </div>
  );
};

export default SideMenubar;
