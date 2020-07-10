import weRequest from '../common/request.js'



export const LoginByWx = (params) => weRequest( '/ui/wxutil/loginByWx', params)
export const UpdateByWx = (params) => weRequest( '/ui/wxutil/updateByWx', params)
export const UpdataUser = (params) => weRequest( '/ui/system/user/updataUser', params)
export const ChosePosition = (params) => weRequest( '/ui/wxutil/chose/position', params)
export const ShopBannerList = (params) => weRequest( '/ui/shop/banner/list', params)
export const GoodShoseList = (params) => weRequest( '/ui/good/shose/list', params)
export const BizMsg = (params) => weRequest( '/app/biz/msg', params)
export const BizCheckAuthcode = (params) => weRequest( '/app/biz/checkAuthcode', params)
export const ShopAddress = (params) => weRequest( '/ui/shop/address', params)
export const LoginPhone = (params) => weRequest( '/ui/wxutil/login/phone', params)
export const AddressList = (params) => weRequest( '/ui/shop/address/list', params)
export const ShopAddressDel = (params) => weRequest( '/ui/shop/address/del', params)
export const OrderList = (params) => weRequest( '/ui/order/list', params)
export const OrderPublish = (params) => weRequest( '/ui/order/publish', params)




