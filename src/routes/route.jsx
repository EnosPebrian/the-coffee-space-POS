import { AdminLandingPage } from "../pages/Adminpages/Product";
import { CashierAccountManagement } from "../pages/Adminpages/CashierAccountManagement";
import { SalesReportPage } from "../pages/Adminpages/SalesReport";
import { CashierLandingPage } from "../pages/CashierPages/CashierLandingPage";
import { Login } from "../pages/Login";
import { Redirect } from "../pages/Redirect";
import { ProtectedPage } from "./ProtectedPage";
import { CategoriesPage } from "../pages/Adminpages/CategoriesPage";
import { DailySales } from "../pages/Adminpages/DailySales";
import { Spec } from "../pages/Spec";

class RouteClass {
  constructor(path = "", element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  // new RouteClass("/", <Redirect />),
  new RouteClass("/", <Spec />),
  new RouteClass("/login", <Login />),
  new RouteClass(
    "/account_management",

    (
      <ProtectedPage needLogin={true} AdminOnly={true}>
        <CashierAccountManagement />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "/TheCoffeeSpace",

    (
      <ProtectedPage needLogin={true}>
        <CashierLandingPage />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "/products",

    (
      <ProtectedPage needLogin={true} AdminOnly={true}>
        <AdminLandingPage />
      </ProtectedPage>
    )
  ),

  new RouteClass(
    "/report",
    (
      <ProtectedPage needLogin={true} AdminOnly={true}>
        <SalesReportPage />
      </ProtectedPage>
    )
  ),

  new RouteClass(
    "/categories",
    (
      <ProtectedPage needLogin={true} AdminOnly={true}>
        <CategoriesPage />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "/dailysales/:params",
    (
      <ProtectedPage needLogin={true} AdminOnly={true}>
        <DailySales />
      </ProtectedPage>
    )
  ),
];
