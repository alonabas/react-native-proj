import { ORDERS_MODULE_NAME } from "../constants";


export const getSortedListOfOrders = () => (state) => (state?.[ORDERS_MODULE_NAME]?.orders ?? [])
.sort((e1, e2) => e2.date - e1.date);