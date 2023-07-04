import React from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { SlLogin, SlLogout } from "react-icons/sl";

const Header = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div className="flex text-lg justify-between p-4 bg-[#f5f5f5] border-2 border-b-0 rounded-t-xl border-[#282939]">
      {user ? (
        <>
          Welcome {user.name}
          <SlLogout
            className="text-[#282939] hover:text-[#db1a5a] cursor-pointer transition duration-300 ease-in-out"
            size={24}
            onClick={handleLogout}
          />
        </>
      ) : (
        <>
          <Link to="/">
            <SlLogin
              className="text-[#282939] hover:text-[#db1a5a] cursor-pointer transition duration-300 ease-in-out"
              size={24}
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
