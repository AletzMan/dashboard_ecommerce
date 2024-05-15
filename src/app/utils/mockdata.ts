import { IOrder, IOrderByState, IProductData } from "../Types/types"

export const monthlyProfiData = [
	{ month: "Enero", profit: 12000, revenue: 50000, loss: 38000 },
	{ month: "Febrero", profit: 15000, revenue: 60000, loss: 45000 },
	{ month: "Marzo", profit: 18000, revenue: 70000, loss: 52000 },
	{ month: "Abril", profit: 20000, revenue: 80000, loss: 60000 },
	{ month: "Mayo", profit: 22000, revenue: 90000, loss: 65000 },
	{ month: "Junio", profit: 25000, revenue: 100000, loss: 70000 },
	{ month: "Julio", profit: 28000, revenue: 110000, loss: 75000 },
	{ month: "Agosto", profit: 30000, revenue: 120000, loss: 80000 },
	{ month: "Septiembre", profit: 32000, revenue: 130000, loss: 85000 },
	{ month: "Octubre", profit: 35000, revenue: 140000, loss: 90000 },
	{ month: "Noviembre", profit: 38000, revenue: 150000, loss: 95000 },
	{ month: "Diciembre", profit: 40000, revenue: 160000, loss: 100000 },
]

export interface IMonthlySales {
	month: string
	sales: number
	salesAmount: number
}

export interface IYearlySales {
	year: number
	data: IMonthlySales[]
}

export const YearlySalesData: IYearlySales[] = [
	{
		year: 2019,
		data: [
			{ month: "January", sales: 350, salesAmount: 195000 },
			{ month: "February", sales: 240, salesAmount: 135000 },
			{ month: "March", sales: 450, salesAmount: 240000 },
			{ month: "April", sales: 510, salesAmount: 275000 },
			{ month: "May", sales: 390, salesAmount: 215000 },
			{ month: "June", sales: 330, salesAmount: 185000 },
			{ month: "July", sales: 550, salesAmount: 300000 },
			{ month: "August", sales: 480, salesAmount: 260000 },
			{ month: "September", sales: 330, salesAmount: 180000 },
			{ month: "October", sales: 280, salesAmount: 150000 },
			{ month: "November", sales: 230, salesAmount: 125000 },
			{ month: "December", sales: 650, salesAmount: 280000 },
		],
	},
	{
		year: 2020,
		data: [
			{ month: "January", sales: 370, salesAmount: 185000 },
			{ month: "February", sales: 260, salesAmount: 130000 },
			{ month: "March", sales: 470, salesAmount: 245000 },
			{ month: "April", sales: 530, salesAmount: 275000 },
			{ month: "May", sales: 410, salesAmount: 210000 },
			{ month: "June", sales: 350, salesAmount: 175000 },
			{ month: "July", sales: 570, salesAmount: 295000 },
			{ month: "August", sales: 500, salesAmount: 260000 },
			{ month: "September", sales: 350, salesAmount: 180000 },
			{ month: "October", sales: 300, salesAmount: 160000 },
			{ month: "November", sales: 240, salesAmount: 130000 },
			{ month: "December", sales: 670, salesAmount: 305000 },
		],
	},
	{
		year: 2021,
		data: [
			{ month: "January", sales: 380, salesAmount: 195000 },
			{ month: "February", sales: 270, salesAmount: 140000 },
			{ month: "March", sales: 490, salesAmount: 255000 },
			{ month: "April", sales: 550, salesAmount: 280000 },
			{ month: "May", sales: 420, salesAmount: 220000 },
			{ month: "June", sales: 360, salesAmount: 180000 },
			{ month: "July", sales: 590, salesAmount: 300000 },
			{ month: "August", sales: 510, salesAmount: 265000 },
			{ month: "September", sales: 360, salesAmount: 185000 },
			{ month: "October", sales: 310, salesAmount: 160000 },
			{ month: "November", sales: 250, salesAmount: 130000 },
			{ month: "December", sales: 680, salesAmount: 310000 },
		],
	},
	{
		year: 2022,
		data: [
			{ month: "January", sales: 390, salesAmount: 200000 },
			{ month: "February", sales: 280, salesAmount: 145000 },
			{ month: "March", sales: 500, salesAmount: 250000 },
			{ month: "April", sales: 560, salesAmount: 275000 },
			{ month: "May", sales: 430, salesAmount: 220000 },
			{ month: "June", sales: 370, salesAmount: 185000 },
			{ month: "July", sales: 610, salesAmount: 305000 },
			{ month: "August", sales: 520, salesAmount: 270000 },
			{ month: "September", sales: 370, salesAmount: 185000 },
			{ month: "October", sales: 320, salesAmount: 160000 },
			{ month: "November", sales: 260, salesAmount: 135000 },
			{ month: "December", sales: 690, salesAmount: 320000 },
		],
	},
	{
		year: 2023,
		data: [
			{ month: "January", sales: 400, salesAmount: 205000 },
			{ month: "February", sales: 290, salesAmount: 150000 },
			{ month: "March", sales: 510, salesAmount: 255000 },
			{ month: "April", sales: 570, salesAmount: 280000 },
			{ month: "May", sales: 440, salesAmount: 225000 },
			{ month: "June", sales: 380, salesAmount: 190000 },
			{ month: "July", sales: 630, salesAmount: 310000 },
			{ month: "August", sales: 530, salesAmount: 275000 },
			{ month: "September", sales: 420, salesAmount: 200000 },
			{ month: "October", sales: 330, salesAmount: 165000 },
			{ month: "November", sales: 270, salesAmount: 140000 },
			{ month: "December", sales: 700, salesAmount: 325000 },
		],
	},
	{
		year: 2024,
		data: [
			{ month: "January", sales: 300, salesAmount: 170000 },
			{ month: "February", sales: 290, salesAmount: 165000 },
			{ month: "March", sales: 320, salesAmount: 180000 },
			{ month: "April", sales: 310, salesAmount: 175000 },
			{ month: "May", sales: 330, salesAmount: 185000 },
			{ month: "June", sales: 340, salesAmount: 190000 },
			{ month: "July", sales: 350, salesAmount: 195000 },
			{ month: "August", sales: 360, salesAmount: 200000 },
			{ month: "September", sales: 370, salesAmount: 205000 },
			{ month: "October", sales: 380, salesAmount: 210000 },
			{ month: "November", sales: 390, salesAmount: 215000 },
			{ month: "December", sales: 400, salesAmount: 220000 },
		],
	},
]

export const stateOrdersData: IOrderByState[] = [
	{ id: "MEX2706", state: "Baja California", orders: 90, amount: 60000 },
	{ id: "MEX2707", state: "Baja California Sur", orders: 75, amount: 50000 },
	{ id: "MEX2708", state: "Coahuila", orders: 85, amount: 55000 },
	{ id: "MEX2709", state: "Chihuahua", orders: 95, amount: 65000 },
	{ id: "MEX2710", state: "Durango", orders: 50, amount: 35000 },
	{ id: "MEX2711", state: "Sinaloa", orders: 70, amount: 45000 },
	{ id: "MEX2712", state: "Sonora", orders: 50, amount: 35000 },
	{ id: "MEX2713", state: "Zacatecas", orders: 65, amount: 50000 },
	{ id: "MEX2714", state: "Nuevo León", orders: 120, amount: 115000 },
	{ id: "MEX2715", state: "San Luis Potosí", orders: 85, amount: 55000 },
	{ id: "MEX2716", state: "Tamaulipas", orders: 100, amount: 70000 },
	{ id: "MEX2717", state: "Aguascalientes", orders: 120, amount: 80000 },
	{ id: "MEX2718", state: "Colima", orders: 70, amount: 45000 },
	{ id: "MEX2719", state: "Jalisco", orders: 150, amount: 110000 },
	{ id: "MEX2720", state: "Michoacán", orders: 65, amount: 50000 },
	{ id: "MEX2721", state: "Nayarit", orders: 45, amount: 30000 },
	{ id: "MEX2722", state: "Campeche", orders: 60, amount: 40000 },
	{ id: "MEX2723", state: "Oaxaca", orders: 90, amount: 60000 },
	{ id: "MEX2724", state: "Puebla", orders: 75, amount: 50000 },
	{ id: "MEX2725", state: "Tabasco", orders: 130, amount: 90000 },
	{ id: "MEX2726", state: "Tlaxcala", orders: 80, amount: 60000 },
	{ id: "MEX2727", state: "Ciudad de México", orders: 200, amount: 150000 },
	{ id: "MEX2728", state: "Guanajuato", orders: 130, amount: 90000 },
	{ id: "MEX2729", state: "Guerrero", orders: 100, amount: 70000 },
	{ id: "MEX2730", state: "Hidalgo", orders: 80, amount: 60000 },
	{ id: "MEX2731", state: "México", orders: 140, amount: 100000 },
	{ id: "MEX2732", state: "Morelos", orders: 55, amount: 40000 },
	{ id: "MEX2733", state: "Querétaro", orders: 110, amount: 75000 },
	{ id: "MEX2734", state: "Veracruz", orders: 150, amount: 80000 },
	{ id: "MEX2735", state: "Chiapas", orders: 110, amount: 75000 },
	{ id: "MEX2736", state: "Quintana Roo", orders: 95, amount: 65000 },
	{ id: "MEX2737", state: "Yucatán", orders: 140, amount: 100000 },
]

export const productsData: IProductData[] = [
	{ id: 0, name: "Producto AC", sku: "SKU209", quantitySold: 71, piecesSold: 120, price: 65 },
	{ id: 1, name: "Producto A", sku: "SKU123", quantitySold: 150, piecesSold: 300, price: 87 },
	{ id: 2, name: "Producto B", sku: "SKU456", quantitySold: 100, piecesSold: 200, price: 23 },
	{ id: 3, name: "Producto C", sku: "SKU789", quantitySold: 120, piecesSold: 240, price: 44 },
	{ id: 4, name: "Producto D", sku: "SKU101", quantitySold: 80, piecesSold: 160, price: 76 },
	{ id: 5, name: "Producto E", sku: "SKU202", quantitySold: 200, piecesSold: 400, price: 55 },
	{ id: 6, name: "Producto F", sku: "SKU303", quantitySold: 90, piecesSold: 180, price: 34 },
	{ id: 7, name: "Producto G", sku: "SKU404", quantitySold: 110, piecesSold: 220, price: 12 },
	{ id: 8, name: "Producto H", sku: "SKU505", quantitySold: 130, piecesSold: 260, price: 98 },
	{ id: 9, name: "Producto I", sku: "SKU606", quantitySold: 70, piecesSold: 140, price: 67 },
	{ id: 10, name: "Producto J", sku: "SKU707", quantitySold: 180, piecesSold: 360, price: 32 },
	{ id: 11, name: "Producto K", sku: "SKU808", quantitySold: 95, piecesSold: 190, price: 78 },
	{ id: 12, name: "Producto L", sku: "SKU909", quantitySold: 50, piecesSold: 100, price: 45 },
	{ id: 13, name: "Producto M", sku: "SKU010", quantitySold: 120, piecesSold: 240, price: 89 },
	{ id: 14, name: "Producto N", sku: "SKU111", quantitySold: 60, piecesSold: 120, price: 21 },
	{ id: 15, name: "Producto O", sku: "SKU212", quantitySold: 85, piecesSold: 170, price: 66 },
	{ id: 16, name: "Producto P", sku: "SKU313", quantitySold: 110, piecesSold: 220, price: 77 },
	{ id: 17, name: "Producto Q", sku: "SKU414", quantitySold: 75, piecesSold: 150, price: 54 },
	{ id: 18, name: "Producto R", sku: "SKU515", quantitySold: 100, piecesSold: 200, price: 33 },
	{ id: 19, name: "Producto S", sku: "SKU616", quantitySold: 130, piecesSold: 260, price: 56 },
	{ id: 20, name: "Producto T", sku: "SKU717", quantitySold: 160, piecesSold: 320, price: 88 },
	{ id: 21, name: "Producto U", sku: "SKU818", quantitySold: 130, piecesSold: 260, price: 11 },
	{ id: 22, name: "Producto V", sku: "SKU919", quantitySold: 75, piecesSold: 150, price: 46 },
	{ id: 23, name: "Producto W", sku: "SKU020", quantitySold: 100, piecesSold: 200, price: 79 },
	{ id: 24, name: "Producto X", sku: "SKU121", quantitySold: 90, piecesSold: 180, price: 22 },
	{ id: 25, name: "Producto Y", sku: "SKU222", quantitySold: 110, piecesSold: 220, price: 57 },
	{ id: 26, name: "Producto Z", sku: "SKU323", quantitySold: 120, piecesSold: 240, price: 68 },
]

export const totalProductsData = { totalProducts: 26 }

export const totalOrdersData = { totalOrders: 1200 }

export interface ITotalSales {
	quantity: number
	amount: number
}

export const totalSalesData = (): ITotalSales => {
	let quantity: number = 0
	let amount: number = 0
	for (let year = 0; year < YearlySalesData.length; year++) {
		for (let month = 0; month < YearlySalesData[year].data.length; month++) {
			quantity += YearlySalesData[year].data[month].sales
			amount += YearlySalesData[year].data[month].salesAmount
		}
	}
	return {
		quantity,
		amount,
	}
}

export const dailyVisitorsData = [
	{ date: "2023-11-01", visitors: 1200 },
	{ date: "2023-11-02", visitors: 1500 },
	{ date: "2023-11-03", visitors: 1300 },
	{ date: "2023-11-04", visitors: 1100 },
	{ date: "2023-11-05", visitors: 900 },
	{ date: "2023-11-06", visitors: 1000 },
	{ date: "2023-11-07", visitors: 1200 },
	{ date: "2023-11-08", visitors: 1400 },
	{ date: "2023-11-09", visitors: 1600 },
	{ date: "2023-11-10", visitors: 1800 },
	{ date: "2023-11-11", visitors: 2000 },
	{ date: "2023-11-12", visitors: 2200 },
]

export const webTrafficData = [
	{ source: "Referal", visits: 500 },
	{ source: "Direct", visits: 700 },
	{ source: "Organic", visits: 1000 },
]

const STATES_ARRAY = [
	{ id: 0, idState: "MEX2706", name: "Baja California" },
	{ id: 1, idState: "MEX2707", name: "Baja California Sur" },
	{ id: 2, idState: "MEX2708", name: "Coahuila" },
	{ id: 3, idState: "MEX2709", name: "Chihuahua" },
	{ id: 4, idState: "MEX2710", name: "Durango" },
	{ id: 5, idState: "MEX2711", name: "Sinaloa" },
	{ id: 6, idState: "MEX2712", name: "Sonora" },
	{ id: 7, idState: "MEX2713", name: "Zacatecas" },
	{ id: 8, idState: "MEX2714", name: "Nuevo León" },
	{ id: 9, idState: "MEX2715", name: "San Luis Potosí" },
	{ id: 10, idState: "MEX2716", name: "Tamaulipas" },
	{ id: 11, idState: "MEX2717", name: "Aguascalientes" },
	{ id: 12, idState: "MEX2718", name: "Colima" },
	{ id: 13, idState: "MEX2719", name: "Jalisco" },
	{ id: 14, idState: "MEX2720", name: "Michoacán" },
	{ id: 15, idState: "MEX2721", name: "Nayarit" },
	{ id: 16, idState: "MEX2722", name: "Campeche" },
	{ id: 17, idState: "MEX2723", name: "Oaxaca" },
	{ id: 18, idState: "MEX2724", name: "Puebla" },
	{ id: 19, idState: "MEX2725", name: "Tabasco" },
	{ id: 20, idState: "MEX2726", name: "Tlaxcala" },
	{ id: 21, idState: "MEX2727", name: "Ciudad de México" },
	{ id: 22, idState: "MEX2728", name: "Guanajuato" },
	{ id: 23, idState: "MEX2729", name: "Guerrero" },
	{ id: 24, idState: "MEX2730", name: "Hidalgo" },
	{ id: 25, idState: "MEX2731", name: "México" },
	{ id: 26, idState: "MEX2732", name: "Morelos" },
	{ id: 27, idState: "MEX2733", name: "Querétaro" },
	{ id: 28, idState: "MEX2734", name: "Veracruz" },
	{ id: 29, idState: "MEX2735", name: "Chiapas" },
	{ id: 30, idState: "MEX2736", name: "Quintana Roo" },
	{ id: 31, idState: "MEX2737", name: "Yucatán" },
]

export interface ICustomer {
	customerID: number
	firstName: string
	lastName: string
	email: string
	phone: string
	address: IAddress
}

export interface IAddress {
	street: string
	city: string
	state: string
	zipcode: string
	country: string
}

export const customers: ICustomer[] = [
	{
		customerID: 1,
		firstName: "Juan",
		lastName: "Pérez",
		email: "juan.perez@example.com",
		phone: "123-456-7890",
		address: {
			street: "123 Calle Principal",
			city: "Ciudad",
			state: "Estado",
			zipcode: "12345",
			country: "País",
		},
	},
	{
		customerID: 2,
		firstName: "María",
		lastName: "Gómez",
		email: "maria.gomez@example.com",
		phone: "987-654-3210",
		address: {
			street: "456 Avenida Secundaria",
			city: "Otra Ciudad",
			state: "Otro Estado",
			zipcode: "54321",
			country: "Otro País",
		},
	},
	{
		customerID: 3,
		firstName: "Carlos",
		lastName: "López",
		email: "carlos.lopez@example.com",
		phone: "555-123-4567",
		address: {
			street: "789 Calle Residencial",
			city: "Nueva Ciudad",
			state: "Nuevo Estado",
			zipcode: "67890",
			country: "Nuevo País",
		},
	},
	{
		customerID: 4,
		firstName: "Ana",
		lastName: "Rodríguez",
		email: "ana.rodriguez@example.com",
		phone: "111-222-3333",
		address: {
			street: "567 Avenida Principal",
			city: "Ciudad Principal",
			state: "Estado Principal",
			zipcode: "11111",
			country: "País Principal",
		},
	},
	{
		customerID: 5,
		firstName: "Luis",
		lastName: "Martínez",
		email: "luis.martinez@example.com",
		phone: "444-555-6666",
		address: {
			street: "890 Calle Secundaria",
			city: "Ciudad Secundaria",
			state: "Estado Secundario",
			zipcode: "22222",
			country: "País Secundario",
		},
	},
	{
		customerID: 6,
		firstName: "Elena",
		lastName: "Sánchez",
		email: "elena.sanchez@example.com",
		phone: "777-888-9999",
		address: {
			street: "123 Avenida Residencial",
			city: "Ciudad Residencial",
			state: "Estado Residencial",
			zipcode: "33333",
			country: "País Residencial",
		},
	},
	{
		customerID: 7,
		firstName: "Miguel",
		lastName: "Hernández",
		email: "miguel.hernandez@example.com",
		phone: "666-777-8888",
		address: {
			street: "456 Calle Principal",
			city: "Otra Ciudad Principal",
			state: "Otro Estado Principal",
			zipcode: "44444",
			country: "Otro País Principal",
		},
	},
	{
		customerID: 8,
		firstName: "Isabel",
		lastName: "Díaz",
		email: "isabel.diaz@example.com",
		phone: "999-000-1111",
		address: {
			street: "789 Avenida Secundaria",
			city: "Nueva Ciudad Secundaria",
			state: "Nuevo Estado Secundario",
			zipcode: "55555",
			country: "Nuevo País Secundario",
		},
	},
	{
		customerID: 9,
		firstName: "Pedro",
		lastName: "García",
		email: "pedro.garcia@example.com",
		phone: "222-333-4444",
		address: {
			street: "567 Calle Residencial",
			city: "Ciudad Residencial",
			state: "Estado Residencial",
			zipcode: "66666",
			country: "País Residencial",
		},
	},
	{
		customerID: 10,
		firstName: "Laura",
		lastName: "Fernández",
		email: "laura.fernandez@example.com",
		phone: "333-444-5555",
		address: {
			street: "890 Avenida Principal",
			city: "Ciudad Principal",
			state: "Estado Principal",
			zipcode: "77777",
			country: "País Principal",
		},
	},
]

export interface ISocialMedia {
	id: number
	name: string
	followers: number
	likes: number
	posts: number
	comments: number
	shares: number
}

export const SocialMediaData: ISocialMedia[] = [
	{
		id: 0,
		name: "Facebook",
		followers: 1987,
		likes: 2250,
		posts: 100,
		comments: 200,
		shares: 300,
	},
	{
		id: 1,
		name: "Twitter",
		followers: 1450,
		likes: 1390,
		posts: 50,
		comments: 80,
		shares: 70,
	},
	{
		id: 2,
		name: "Instagram",
		followers: 1500,
		likes: 1750,
		posts: 80,
		comments: 100,
		shares: 200,
	},
	{
		id: 3,
		name: "TikTok",
		followers: 1000,
		likes: 1250,
		posts: 70,
		comments: 150,
		shares: 100,
	},
	{
		id: 4,
		name: "YouTube",
		followers: 2500,
		likes: 2750,
		posts: 150,
		comments: 250,
		shares: 400,
	},
]
