import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoadingIndicator from "src/components/LoadingIndicator";

type TRoutes = Array<{
  exact?: boolean;
  path?: string | string[];
  guard?: any;
  layout?: any;
  component?: any;
  routes?: TRoutes;
}>;

export const renderRoutes = (routes: TRoutes = []): JSX.Element => (
  <Suspense fallback={<LoadingIndicator />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: TRoutes = [
  {
    exact: true,
    path: "/employee/add",
    component: lazy(() => import("src/views/employee/EmployeeAdd"))
  },
  {
    exact: true,
    path: "/employee/list",
    component: lazy(() => import("src/views/employee/EmployeeList"))
  },
  {
    exact: true,
    path: "/employee/edit/:id",
    component: lazy(() => import("src/views/employee/EmployeeEdit"))
  },
  {
    component: () => <Redirect to="/employee/list" />
  }
];

export default routes;
