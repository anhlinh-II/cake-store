import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { IoIosAddCircle, IoMdSettings } from "react-icons/io";
import { IoHome, IoLogOut, IoPersonCircle } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";
import { Menu, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SideBar = () => {
     const [active, setActive] = useState<string>("customer")
     return (
          <div 
          // style={{position: "fixed", top: "0", left: "0"}}
          >
               <Sidebar
                    rootStyles={{
                         [`.${sidebarClasses.container}`]: {
                              backgroundColor: '#F3F4F6',
                              fontSize: '15px',
                              paddingTop: "20px",
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: "between",
                              alignItems: "start",
                              width: "300px",
                              height: "100vh",
                              borderRight: "gray solid 1px"
                         },
                    }}
               >
                    {/* <div className='px-4 py-6 satisfy-regular text-sky-600'>Group 6 - Demo</div> */}
                    <Menu
                         rootStyles={{
                         }}
                         menuItemStyles={{
                              button: ({ level, active, disabled }) => {
                                   // only apply styles on first level elements of the tree
                                   if (level === 0)
                                        return {
                                             width: "100%",
                                             color: disabled ? 'rgba(0,0,0,0.3)' : '#075985',
                                             backgroundColor: active ? 'rgb(186 230 253)' : undefined,
                                             fontWeight: "500",
                                             fontSize: "16px",
                                             borderRadius: "10px",
                                             "&:hover": {
                                                  color: "rgb(7 89 133)",
                                                  transition: "all .08s linear",
                                                  "&:focus": {
                                                       backgroundColor: 'rgb(186 230 253)'
                                                  },
                                                  backgroundColor: 'rgb(230 230 230)'
                                             },
                                             paddingRight: '100px',
                                             cursor: disabled ? "none" : undefined
                                        };
                              },

                         }}
                         renderExpandIcon={({ open }) => <span>{open ? <FaAngleDown /> : <FaAngleRight />}</span>}
                    >
                         <MenuItem
                              rootStyles={{ padding: "5px" }}
                              active={active === "customer" ? true : false}
                              component={<Link to={'/admin/customers'} />}
                              icon={<IoHome />}
                              onClick={() => setActive("customer")}
                         >
                              Customer
                         </MenuItem>
                         <MenuItem
                              active={active === "reels" ? true : false}
                              onClick={() => setActive("reels")}
                              rootStyles={{ padding: "5px" }}
                              component={<Link to={'/admin/orders'} />}
                              icon={<PiVideoFill />}
                         >
                              Orders
                         </MenuItem>
                         <MenuItem
                              active={active === "product" ? true : false}
                              onClick={() => setActive("product")}
                              rootStyles={{ padding: "5px" }}
                              icon={<IoIosAddCircle />}
                              component={<Link to={'/admin/products'} />}
                         >
                              Products
                         </MenuItem>
                         <MenuItem
                              active={active === "profile" ? true : false}
                              onClick={() => setActive("profile")}
                              rootStyles={{ padding: "5px" }}
                              component={<Link to={'/admin/payments'} />}
                              icon={<IoPersonCircle />}
                         >
                              Payments
                         </MenuItem>
                         <MenuItem
                              rootStyles={{ padding: "5px" }}
                              active={active === "setting" ? true : false}
                              onClick={() => setActive("setting")}
                              icon={<IoMdSettings />}
                              component={<Link to={'/admin/reviews'} />}
                         >
                              Reviews
                         </MenuItem>
                         <MenuItem
                              rootStyles={{ padding: "5px" }}
                              active={active === "admin" ? true : false}
                              onClick={() => setActive("admin")}
                              icon={<MdManageAccounts />}
                              component={<Link to={'/admin/stores'} />}
                         >
                              Store
                         </MenuItem>
                         <MenuItem
                              rootStyles={{ padding: "5px" }}
                              active={active === "logout" ? true : false}
                              onClick={() => setActive("logout")}
                              component={<Link to={'/admin/suppliers'} />}
                              icon={<IoLogOut />}
                         >
                              Suppliers
                         </MenuItem>
                    </Menu>
               </Sidebar>
          </div>
     )
};

export default SideBar;
