import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [
    {
        id: '1',
        deliveryDate: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDate: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDate: 1,
        priceCents: 999
    }
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
 
     
        deliveryOptions.forEach((option)=>{
            if (option.id === deliveryOptionId) {
               deliveryOption = option
            }
          });

  return deliveryOption || deliveryOptions[0]
};

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
}

export function calculateDeliveryDate(deliveryOption) {
    //   const today = dayjs();
    //   const deliverydate = today.add(deliveryOption.deliveryDate, 'days');
    
    let remainingDays = deliveryOption.deliveryDate;
    let deliveryDate = dayjs();
    
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'days');
        
        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }
    const dateString = deliveryDate.format('dddd, MMMM D');

      return dateString
}