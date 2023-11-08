import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { Link, useNavigate } from "react-router-dom";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Articles", type: "link", href: "/articles" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "Faq", type: "link", href: "/faq" },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => {
      return !curState;
    });
  };

  return (
    <div>
      <li className="relative group">
        {item.type === "link" ? (
          <>
            <Link
              to={"/"}
              className="hover:text-blue-500 transition-all duration-200 font-bold py-2 px-4 cursor-pointer"
            >
              {item.name}
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <button
              className="px-4 py-2 flex gap-x-1 items-center"
              onClick={toggleDropdownHandler}
            >
              <span className="font-bold">{item.name}</span>
              <MdKeyboardArrowDown />
            </button>
            <div
              className={`${
                dropdown ? "block" : "hidden"
              } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
            >
              <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                {item.items.map((page, index) => (
                  <Link
                    key={index}
                    to={page.href}
                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                  >
                    {page.title}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navVisibleHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <section className="w-10/12 m-auto sticky top-0 left-0 right-0 z-50 bg-white">
        <header className="container mx-auto px-5 flex justify-between py-4 items-center ">
          <div className="cursor-pointer">
            {/* <img className="w-16 " src={images.Logo} alt="logo" /> */}
            <span className="font-roboto text-3xl font-bold text-dark-soft">
              Thenews
            </span>
            <h4 className="font-opensans italic">Discover the Latest</h4>
          </div>
          <div className="lg:hidden z-50">
            {navIsVisible ? (
              <AiOutlineClose className="w-6 h-6" onClick={navVisibleHandler} />
            ) : (
              <AiOutlineMenu className="w-6 h-6 " onClick={navVisibleHandler} />
            )}
          </div>
          <div
            className={`${
              navIsVisible ? "right-0" : "-right-full"
            } transition-all duration-300 mt-[60px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-6 items-center`}
          >
            <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-[0.75rem] font-semibold">
              {navItemsInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>
            {userState.userInfo ? (
              <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-[0.75rem] font-semibold">
                <div className="relative group">
                  <div className="flex flex-col item-center">
                    <button
                      href="/"
                      className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-10 py-2.5 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white duration-300"
                      onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                      <span>Profie</span>
                      <MdKeyboardArrowDown />
                    </button>

                    <div
                      className={`${
                        profileDropdown ? "block" : "hidden"
                      } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                      <ul className="bg-dark-soft lg:bg-transparent flex flex-col shadow-md shadow-neutral-500 rounded-lg overflow-hidden ">
                        <button
                          type="button"
                          className="hover:bg-primary hover:text-white px-4 py-2 text-white lg:text-dark-soft "
                        >
                          Dashboard
                        </button>

                        <button
                          onClick={logoutHandler}
                          type="button"
                          className="hover:bg-primary hover:text-white px-4 py-2 text-white lg:text-dark-soft "
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="mt-5 lg:mt-0 border-2 border-blue-500 px-10 py-2.5 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </header>
      </section>
    </div>
  );
};

export default Header;
