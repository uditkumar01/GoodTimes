export function getStockTagColor(status){
    switch(status.toLowerCase()){
        case "out of stock":
            return "danger";
        case "in stock":
            return "success";
        default:
            return "warning";
    }
}