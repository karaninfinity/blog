import { 
  Cog6ToothIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  ClipboardDocumentIcon,
  QueueListIcon
} from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const icon = {
    className: "w-5 h-5 text-inherit",
  };

  const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
      },
      {
        icon: <ClipboardDocumentIcon {...icon} />,
        name: "Categories",
        path : "/categories"
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "Subcategories",
        path : "/subcategories"
      },
      {
        icon: <PencilSquareIcon {...icon} />,
        name: "Blog",
        path: "/blogs",
      },
    ],
  },
];


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Outlet/>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
