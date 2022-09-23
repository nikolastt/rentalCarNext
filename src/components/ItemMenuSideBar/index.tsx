import Link from "next/link";
import React, { Children } from "react";

interface IItemMenuSideBar {
  content?: string;
  children?: React.ReactNode;
  href: string;
  closeMenu: () => void;
  onClick?: () => void;
  active?: boolean;
}

const ItemMenuSideBar: React.FC<IItemMenuSideBar> = ({
  content,
  children,
  href,
  closeMenu,
  active,
}) => {
  return (
    <Link href={href} passHref>
      <div
        className={`h-[40px] flex items-center text-white border-l-8 border-transparent font-light ${
          active && "  !border-primary-500 "
        }  py-2 rounded-r-lg hover:bg-gray-800/50  cursor-pointer `}
        onClick={closeMenu}
      >
        {children}

        <span className="">{content}</span>
      </div>
    </Link>
  );
};

export default ItemMenuSideBar;
