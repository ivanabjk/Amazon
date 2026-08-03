export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order); //adds the order in the front of the array instead of the back
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export function getOrder(orderId){
    let matchingOrder;

    orders.forEach(order => {
        if(order.id === orderId){
            matchingOrder = order;
        }
    });

    return matchingOrder;
}