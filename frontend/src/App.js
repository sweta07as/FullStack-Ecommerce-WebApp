import "./App.css";
import { useState, useEffect } from "react";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";

//removed .js from all of the above ones to make it look cool
//but if you have error, please add it

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  //prevents right click and inspect, so don't uncomment
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/products"
          component={ProductList}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/product"
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/orders"
          component={OrderList}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/order/:id"
          component={ProcessOrder}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/users"
          component={UsersList}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/user/:id"
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/reviews"
          component={ProductReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
