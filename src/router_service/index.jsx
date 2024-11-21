//main
import Dashboard from "../MainPage/Main/Dashboard";
//Employees
import Employees from "../MainPage/Employees";
import Employee from "../MainPage/Employees/Employees";
//Pages
import ProfilePage from "../MainPage/Pages/Profile";
import GroupProfilePage  from "../MainPage/Pages/GroupProfile";
import Subscription from "../MainPage/Pages/Subscription";

//groups
import GroupsRoute from "../MainPage/Groups/Groups";

export default [
  {
    path: "main",
    component: Dashboard,
  },
  {
    path: "employee",
    component: Employee,
  },
  {
    path: "group",
    component: GroupsRoute,
  },
  {
    path: "employees",
    component: Employees,
  },
  {
    path: "profile",
    component: ProfilePage,
  },
  {
    path: "groupprofile",
    component: GroupProfilePage,
  },
  {
    path: "subscription",
    component: Subscription,
  },
];
