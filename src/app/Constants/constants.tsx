import {
	CustomersIcon,
	DashboardIcon,
	InventoryIcon,
	MarketingIcon,
	OrdersIcon,
	OverviewIcon,
	ProductsIcon,
	SalesIcon,
	SecurityIcon,
	SettingsIcon,
} from "../SVG/componentsSVG"
import { MenuOptionsTypes, OptionsType } from "../Types/types"

export const MenuOptions: OptionsType[] = [
	{
		section: MenuOptionsTypes.dashboard,
		subSections: [],
		icon: <OverviewIcon />,
	},
	{
		section: MenuOptionsTypes.sales,
		subSections: ["Recent orders", "Sales reports"],
		icon: <SalesIcon />,
	},
	{
		section: MenuOptionsTypes.inventory,
		subSections: ["Stock control", "Recording entries and exits", "Low inventory notifications"],
		icon: <InventoryIcon />,
	},
	{
		section: MenuOptionsTypes.products,
		subSections: ["Top products", "Product catalog", "Creating and editing products"],
		icon: <ProductsIcon />,
	},
	{
		section: MenuOptionsTypes.customers,
		subSections: ["List customers", "Account management", "Reset password"],
		icon: <CustomersIcon />,
	},
	{
		section: MenuOptionsTypes.orders,
		subSections: ["Order list", "Shipment status and tracking", "Invoice generation"],
		icon: <OrdersIcon />,
	},
	{
		section: MenuOptionsTypes.marketing,
		subSections: ["Marketing campaigns", "Promotions and discounts", "Coupon management", "Social media integration"],
		icon: <MarketingIcon />,
	},
	{
		section: MenuOptionsTypes.security,
		subSections: ["User and permission management", "Registro de actividades", "Data backup and recovery"],
		icon: <SecurityIcon />,
	},
	{
		section: MenuOptionsTypes.settings,
		subSections: ["General store settings", "Payment and shipping methods", "Privacy policies and terms"],
		icon: <SettingsIcon />,
	},
]
