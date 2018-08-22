// import { myOrderService } from './service';
// import {
//   STATUS,
// } from './constants';



// export function getOrderDetail(orderId) {
//   return function (dispatch) {
//     return myOrderService.getOrderDetail({ orderId }).then(function (response) {
//         dispatch({
//           type: "ORDER_DETAIL",
//           payload: response
//         });

//       return response;
//     }).catch((e) => {
//       dispatch({
//         type: "SERVER_ERROR_DETAIL",
//       });
//     });
//   };
// }