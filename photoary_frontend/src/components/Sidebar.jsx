import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';



const Sidebar = ({ user, closeToggle }) => {

    const handleCloseSideBar = () => {
        if (closeToggle) closeToggle(false);
    }

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 ">
            <div className="flex flex-col">
                <Link
                    to={"/"}
                    className="flex px-5 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSideBar}
                >
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSideBar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl"> Discover Categories</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            key={category.name}
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSideBar}
                        >
                            <img src={category.image} alt="category" className="w-6 h-8 rounded-full shadow-sm"/>
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link to={`/user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSideBar}

                >
                    <img src={user.image} alt="user-profile" className="w-10 h-10 rounded-full" />
                    <p>{user.userName}</p>
                    <IoIosArrowForward />
                </Link>
            )}
        </div>
    )
}

export default Sidebar
