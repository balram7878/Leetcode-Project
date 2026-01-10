import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/authSlice";

export default function Header() {
  const { firstName } = useSelector((state) => {
    console.log(state.auth);
    return state?.auth?.user;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const menuRef = useRef(null);

  function showMenu() {
    return (
      <div className="absolute top-16 right-10 mt-2 z-20">
        <ul className="menu bg-gray-800 text-gray-200 w-56 rounded-md shadow-lg">
          <li>
            <a
              className="hover:bg-gray-700"
              onClick={() => {
                dispatch(logout());
                setIsMenuOpen(false);
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <header className="bg-gray-900 h-20 shadow-md sticky top-0 z-10">
        <div className="max-w-full h-full px-10 flex justify-between items-center relative">
          <div className="flex items-center">
            <a
              href="/"
              className="text-3xl font-extrabold text-gray-400 tracking-wider"
            >
              CodeTree
            </a>
          </div>

          <div ref={menuRef} className="relative z-10">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-lg font-bold text-gray-200 hidden sm:block">
                {firstName || "Guest User"}
              </span>
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-16 rounded-full text-center">
                  <span className="text-3xl">
                    {firstName ? firstName[0] : "G"}
                  </span>
                </div>
              </div>
            </div>

            {isMenuOpen && showMenu()}
          </div>
        </div>
      </header>
    </>
  );
}
