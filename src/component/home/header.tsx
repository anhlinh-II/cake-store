import { Link } from 'react-router-dom';

const Header = () => {
     return (
          <header className="bg-sky-600 w-full p-4 text-white shadow-md">
               <div className="container mx-auto flex justify-center items-center">
                    <nav>
                         <ul className="flex space-x-6">
                              <li className='cursor-pointer hover:text-gray-200'>     
                                   <Link to="/" className="hover:text-blue-300">Home</Link>
                              </li>
                              <li className='cursor-pointer hover:text-gray-200'>
                                   <Link to="/products" className="hover:text-blue-300">Products</Link>
                              </li>
                              <li className='cursor-pointer hover:text-gray-200'>
                                   <Link to="/stores" className="hover:text-blue-300">Stores</Link>
                              </li>
                              <li className='cursor-pointer hover:text-gray-200'>
                                   <Link to="/admin" className="hover:text-blue-300">Admin</Link>
                              </li>
                         </ul>
                    </nav>
               </div>
          </header>
     );
};

export default Header;
