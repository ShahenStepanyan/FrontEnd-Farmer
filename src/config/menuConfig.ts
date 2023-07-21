import {
  HomeOutlined,
  GitlabFilled,
  UsergroupAddOutlined,
  DollarOutlined,
  // FileOutlined,
  // KeyOutlined,
  // LockOutlined,
  // AppstoreOutlined,
  // AreaChartOutlined,
  // ClusterOutlined,
  // TableOutlined,
  // FileExcelOutlined,
  // FileZipOutlined,
  // CopyOutlined,
  // UserOutlined,
  // BugOutlined,
} from "@ant-design/icons";

/**
 * Icon:Menu item Icon
 * roles:Indicates that the current menu item can be displayed under the role, if this option is not written, it indicates that the menu item is fully open, and it is displayed under any role.
 */
const menuList = [
  {
    title: "Main page",
    path: "/dashboard",
    Icon: HomeOutlined,
    roles: ["admin", "editor", "guest"],
  },
  {
    title: "Animals",
    path: "/animals",
    Icon: GitlabFilled,
    roles: ["admin", "editor", "guest"],
  },
  {
    title: "User Management",
    path: "/user",
    Icon: UsergroupAddOutlined,
    roles: ["admin"],
  },
  {
    title: "Spending",
    path: "/spending",
    Icon: DollarOutlined,
    roles: ["admin"],
  },
  // {
  //   title: "Author blog",
  //   path: "/doc",
  //   Icon: FileOutlined,
  //   roles: ["admin", "editor", "guest"],
  // },
  // {
  //   title: "Guide pages",
  //   path: "/guide",
  //   Icon: KeyOutlined,
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "Permission test",
  //   path: "/permission",
  //   Icon: LockOutlined,
  //   children: [
  //     {
  //       title: "Permission description",
  //       path: "/permission/explanation",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Admin page",
  //       path: "/permission/adminPage",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Guest page",
  //       path: "/permission/guestPage",
  //       roles: ["guest"],
  //     },
  //     {
  //       title: "Editor page",
  //       path: "/permission/editorPage",
  //       roles: ["editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "Assembly",
  //   path: "/components",
  //   Icon: AppstoreOutlined,
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Welfare text",
  //       path: "/components/richTextEditor",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "markdown",
  //       path: "/components/Markdown",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "Drag and drop list",
  //       path: "/components/draggable",
  //       roles: ["admin", "editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "chart",
  //   path: "/charts",
  //   Icon: AreaChartOutlined,
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Keyboard chart",
  //       path: "/charts/keyboard",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "line chart",
  //       path: "/charts/line",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "Mixed chart",
  //       path: "/charts/mix-chart",
  //       roles: ["admin", "editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "Routing nested",
  //   path: "/nested",
  //   Icon: ClusterOutlined,
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Menu 1",
  //       path: "/nested/menu1",
  //       children: [
  //         {
  //           title: "Menu 1-1",
  //           path: "/nested/menu1/menu1-1",
  //           roles: ["admin", "editor"],
  //         },
  //         {
  //           title: "Menu 1-2",
  //           path: "/nested/menu1/menu1-2",
  //           children: [
  //             {
  //               title: "Menu 1-2-1",
  //               path: "/nested/menu1/menu1-2/menu1-2-1",
  //               roles: ["admin", "editor"],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "sheet",
  //   path: "/table",
  //   Icon: TableOutlined,
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "excel",
  //   path: "/excel",
  //   Icon: FileExcelOutlined,
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Export Excel",
  //       path: "/excel/export",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "Upload EXCEL",
  //       path: "/excel/upload",
  //       roles: ["admin", "editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "zip",
  //   path: "/zip",
  //   Icon: FileZipOutlined,
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "Clipboard",
  //   path: "/clipboard",
  //   Icon: CopyOutlined,
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "About author",
  //   path: "/about",
  //   Icon: UserOutlined,
  //   roles: ["admin", "editor", "guest"],
  // },
  // {
  //   title: "BUG collection",
  //   path: "/bug",
  //   Icon: BugOutlined,
  //   roles: ["admin"],
  // },
];
export default menuList;
