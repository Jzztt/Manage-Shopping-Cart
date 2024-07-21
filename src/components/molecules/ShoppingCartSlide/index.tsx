import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/ultis/formatCurrency";

const ShoppingCartSlide = () => {
  const orderId = "669cef7fc201fa090937ed04";

  const {
    openCart,
    isOpen,
    closeCart,
    cartItems,
    removeFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    totalCost,
    cartQuantity,
  } = useShoppingCart();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={openCart}>
        <DialogContent disableStyle={true}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          onClick={closeCart}
                          className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <X aria-hidden="true" className="w-6 h-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItems.map((products) => (
                            <li key={products._id} className="flex py-6">
                              <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                <img
                                  src={products.product.image}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>

                              <div className="flex flex-col flex-1 ml-4">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a>{products.product.name}</a>
                                    </h3>
                                    <p className="ml-4">
                                      ${products.product.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {/* {products.color} */}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between flex-1 text-sm">
                                  <p className="text-gray-500">
                                    Quantity {products.quantity}
                                  </p>

                                  <div className="flex">
                                    {/* <button
                                      type="button"
                                      onClick={() =>
                                        removeFromCart(
                                          orderId,
                                          products.product._id.toString()
                                        )
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button> */}
                                    <div className="flex items-center">
                                      <button
                                        onClick={() =>
                                          decreaseCartQuantity(
                                            orderId,
                                            products.product._id.toString()
                                          )
                                        }
                                        className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                      >
                                        <svg
                                          className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 18 2"
                                        >
                                          <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M1 1h16"
                                          />
                                        </svg>
                                      </button>
                                      <p className="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 shrink-0 focus:outline-none focus:ring-0 dark:text-white">
                                        {" "}
                                        {cartQuantity}
                                      </p>
                                      <button
                                      onClick={() => increaseCartQuantity("669cb03364032239f8c2c5c4", products.product._id.toString())}
                                        className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                      >
                                        <svg
                                          className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 18 18"
                                        >
                                          <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 1v16M1 9h16"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{formatCurrency(totalCost)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={closeCart}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShoppingCartSlide;
