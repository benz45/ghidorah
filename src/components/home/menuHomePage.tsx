import React, { useState, Fragment } from "react";
import ArrowIcon from "../icons/arrow";
import { Transition, Menu } from "@headlessui/react";
import AuthBusiness from "@/business/authBusiness";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuHomePage() {
  const [isShowOption, setIsShowOption] = useState<boolean>(false);
  const authBusiness = new AuthBusiness();
  const router = useRouter();

  const signOut = async () => {
    try {
      await authBusiness.signOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="flex w-20 items-center cursor-pointer"
        onClick={() => setIsShowOption((isShow) => !isShow)}
      >
        <span className="pl-3 select-none">Guest</span>
        <ArrowIcon width={20} height={20} className="pl-2" fill="black" />
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={isShowOption}
        >
          <Menu.Items className="absolute right-0 z-10 mt-7 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm select-none"
                    )}
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm select-none"
                    )}
                  >
                    Support
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm select-none"
                    )}
                  >
                    License
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm select-none"
                    )}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
