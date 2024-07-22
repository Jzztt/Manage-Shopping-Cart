import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Flag, TebToastContainer } from "@/components/atoms";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/ultis/formatCurrency";
import { checkoutPaymentService } from "@/services";
import { toast } from "react-toastify";

interface IShoppingCheckoutProps {
  isShowDialogCheckout: boolean;
  handleShowDialogCheckout: (value: boolean) => void;
}

export interface IFormCheckoutData {
  name: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
}
const ShoppingCheckout = (props: IShoppingCheckoutProps) => {
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [formData, setFormData] = useState<IFormCheckoutData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "",
  });
  const tax = 199;
  const { totalCost } = useShoppingCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "paymentMethod") {
      if (value === "pay-on-delivery") {
        setShippingFee((prevTotal) => prevTotal + 15);
      } else if (formData.paymentMethod === "pay-on-delivery") {
        setShippingFee((prevTotal) => prevTotal - 15);
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const sendCheckoutPayment = await checkoutPaymentService.sendCheckoutPayment(formData, "669cef7fc201fa090937ed04");
    // if(!sendCheckoutPayment?.success){
    //   toast.error(sendCheckoutPayment?.message);
    //   return;
    // }
    console.log(formData);


    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      paymentMethod: "",
    });
    props.handleShowDialogCheckout(false);
  };
  return (
    <>
      <Dialog
        open={props.isShowDialogCheckout}
        onOpenChange={() => props.handleShowDialogCheckout(false)}
      >
        <DialogContent className="max-w-max w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Delivery Details
            </DialogTitle>
          </DialogHeader>
          <div>
            <div className=" md:overflow-auto">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 sm:mt-8 md:block sm:block md:overflow-auto lg:flex lg:items-start lg:gap-12 xl:gap-16"
                >
                  <div className="w-full min-w-0 space-y-8 ">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Bonnie Green"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email*
                          </label>
                          <input
                            type="email"
                            id="your_email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                              Address*
                            </label>
                          </div>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Ha Noi, Viet Nam"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {" "}
                            Phone Number*{" "}
                          </label>
                          <div className="flex">
                            <div className=" gap-2 z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                              <Flag className="w-full md:block" code="VN" />
                              +84
                            </div>
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="phone-input"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                                placeholder="039-999-9999"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Payment
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 ps-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="credit-card"
                                aria-describedby="credit-card-text"
                                type="radio"
                                name="paymentMethod"
                                value="credit-card"
                                checked={
                                  formData.paymentMethod === "credit-card"
                                }
                                onChange={handleChange}
                                className="w-4 h-4 bg-white border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              />
                            </div>

                            <div className="text-sm ms-4">
                              <label className="font-medium leading-none text-gray-900 dark:text-white">
                                {" "}
                                Credit Card{" "}
                              </label>
                              <p
                                id="credit-card-text"
                                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                              >
                                Pay with your credit card
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 ps-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="pay-on-delivery"
                                aria-describedby="pay-on-delivery-text"
                                type="radio"
                                name="paymentMethod"
                                value="pay-on-delivery"
                                checked={
                                  formData.paymentMethod === "pay-on-delivery"
                                }
                                onChange={handleChange}
                                className="w-4 h-4 bg-white border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              />
                            </div>

                            <div className="text-sm ms-4">
                              <label className="font-medium leading-none text-gray-900 dark:text-white">
                                {" "}
                                Bank Transfer{" "}
                              </label>
                              <p
                                id="pay-on-delivery-text"
                                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                              >
                                +$15 payment processing fee
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                    <div className="flow-root">
                      <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                        <p className="flex items-center justify-between gap-4 py-3">
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Subtotal
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {formatCurrency(totalCost)}
                          </p>
                        </p>

                        <p className="flex items-center justify-between gap-4 py-3">
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Savings
                          </p>
                          <p className="text-base font-medium text-green-500">
                            0
                          </p>
                        </p>

                        <p className="flex items-center justify-between gap-4 py-3">
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Tax
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {totalCost ? formatCurrency(tax) : 0}
                          </p>
                        </p>

                        <p className="flex items-center justify-between gap-4 py-3">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            Total
                          </p>
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            {totalCost
                              ? formatCurrency(totalCost + tax + shippingFee)
                              : 0}
                          </p>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
                        <button
                          type="submit"
                          className="w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          Cancel
                        </button>
                        <button className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                          Continue to Payload
                        </button>
                      </div>

                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        One or more items in your cart require an account.{" "}
                        <a
                          href="#"
                          title=""
                          className="font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                        >
                          Sign in or create an account now.
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShoppingCheckout;
