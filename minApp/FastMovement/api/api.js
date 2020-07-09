import weRequest from '../common/request.js'



export const LoginByWx = (params) => weRequest( '/ui/wxutil/loginByWx', params)
export const UpdataUser = (params) => weRequest( '/ui/system/user/updataUser', params)
export const ShopBannerList = (params) => weRequest( '/ui/shop/banner/list', params)
export const GoodShoseList = (params) => weRequest( '/ui/good/shose/list', params)






