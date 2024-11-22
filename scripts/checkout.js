import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { isWeekend as isSatSun } from "./utils/isWeekend.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
// import '../data/class-oop.js'
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

export async function loadPage() {
    try {
        await loadProductFetch();

        // const value = await new Promise((resolve) => {
        //     loadCart(() => {
        //         resolve('seed');
        //     })
        // });
        // console.log(value);

        renderCheckoutHeader();
        renderOrderSummary();
        paymentSummary();

    } catch (error) {
        console.log(error, 'unexpected error, try again later');
    }


}
loadPage()

/*
Promise.all([
    loadProductFetch(),
    new Promise((resolve) => {
        loadCart(()=>{
            resolve();
        })
       })
]).then((value)=>{
    console.log(value);

    renderCheckoutHeader();
    renderOrderSummary();
    paymentSummary();
})

/*
new Promise((resolve) => {
    loadProduct(()=>{
        resolve()
    })
}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    paymentSummary();
}).then(()=>{
   return new Promise((resolve) => {
    loadCart(()=>{
        resolve();
    })
   })
})
/*
loadProduct(()=>{

    renderCheckoutHeader();
    renderOrderSummary();
    paymentSummary();

});
*/

// const today = dayjs();
// console.log(`'Today date' ${today.format('MMMM, D')}`);

// const addOneMonth = today.add(31, 'days');
// console.log(`one month from today ${addOneMonth.format('MMMM, D')}`);

// const minusOneMonth = today.subtract(31, 'days');
// console.log(`minus one month from today ${minusOneMonth.format('MMMM, D')}`);

// console.log(today.add(4,'days').format('dddd'));
// console.log(today.add(5,'days').format('dddd'));
// console.log(today.add(6,'days').format('dddd'));
// console.log(today.add(7,'days').format('dddd'));
// console.log(today.add(8,'days').format('dddd'));
// console.log(today.add(9,'days').format('dddd'));
// console.log(today.add(10,'days').format('dddd'));


// let date = dayjs();
// console.log(date.format('dddd, MMMM D'));
// console.log(isSatSun(date));

// date = dayjs().add(2, 'days');
// console.log(date.format('dddd, MMMM D'));
// console.log(isSatSun(date));

// date = dayjs().add(4, 'days');
// console.log(date.format('dddd, MMMM D'));
// console.log(isSatSun(date));

// date = dayjs().add(6, 'days');
// console.log(date.format('dddd, MMMM D'));
// console.log(isSatSun(date));

// isSatSun(date);