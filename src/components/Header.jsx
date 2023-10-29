import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const navItemsInfo = [
  {
    name: "Home",
    type: "link",
  },
  {
    name: "Articles",
    type: "link",
  },
  {
    name: "Pages",
    type: "dropdown",
    items: ["About us", "Contact"],
  },
  {
    name: "Pricing",
    type: "link",
  },
  {
    name: "FAQ",
    type: "link",
  },
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
            <a
              href="/"
              className="hover:text-blue-500 transition-all duration-200 font-bold py-2 px-4 cursor-pointer"
            >
              {item.name}
            </a>
          </>
        ) : (
          <div className="flex flex-col item-center">
            <button
              href="/"
              className="px-4 py-2 flex gap-x-1 items-center "
              onClick={toggleDropdownHandler}
            >
              <span>{item.name}</span>
              <MdKeyboardArrowDown />
            </button>

            <div
              className={`${
                dropdown ? "block" : "hidden"
              } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
            >
              <ul className="bg-dark-soft lg:bg-transparent flex flex-col shadow-md shadow-neutral-500 rounded-lg overflow-hidden ">
                {item.items.map((page) => (
                  <a
                    href="/"
                    className="hover:bg-primary hover:text-white px-4 py-2 text-white lg:text-dark-soft "
                  >
                    {page}
                  </a>
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
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibleHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  return (
    <div>
      <section className=" sticky top-0 left-0 right-0 z-50 bg-white">
        <header className="container mx-auto px-5 flex justify-between py-4 items-center ">
          <div className="cursor-pointer">
            {/* <img className="w-16 " src={images.Logo} alt="logo" /> */}
            <span className="font-roboto text-4xl font-bold text-dark-soft">
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
            } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-6 items-center`}
          >
            <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-[0.75rem] font-semibold">
              {navItemsInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>
            <button className="mt-5 lg:mt-0 border-2 border-blue-500 px-10 py-2.5 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white duration-300">
              Sign In
            </button>
          </div>
        </header>
      </section>
    </div>
  );
};

export default Header;
