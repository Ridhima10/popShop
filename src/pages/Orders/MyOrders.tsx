import { Link } from "react-router-dom";
import Head from "../../components/Head";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";

export interface ORDER {
  username: string;
  orderId: string;
  date: string;
  phone: number;
  status: string;
  price: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<ORDER[]>([]);
  const userName = useSelector((state: RootState) => state.auth.user.username);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("username", userName);

        if (error) throw error;

        console.log(data);
        if (data) setOrders(data);
        else setOrders([]);
      } catch (err) {
        console.log("Error fetching orders: ", err);
      }
    };

    if (userName) fetchOrdersData();
  }, [userName]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
        <Head h1="My" h2="Orders" />
      </div>

      <div className="w-2/3 mx-auto mb-32 mt-12">
        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table w-full">
            {/* Table header */}
            <thead>
              <tr className="text-neutral">
                <th>Order No.</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th className="pl-12">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((order, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                      }
                    >
                      <td>{order.orderId}</td>
                      <td>{}</td>
                      <td>${order.price}</td>
                      <td>{order.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Paid"
                              ? "badge-success badge-outline"
                              : order.status === "Cancelled"
                              ? "badge-error badge-outline"
                              : "badge-warning badge-outline"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link to="#">
                          <Button
                            text="View"
                            color="mygreen"
                            hover="myyellow"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
