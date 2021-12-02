function extract_items_and_quantity(msg){
    // remove the multiple spaces
    let items =  msg.replace(/\s\s+/g, ' ').trim();
    if(!items){
        return []
    }
    let splitItems = items.split(",");
    return splitItems.map((ele)=>{
        const item = ele.trim().split(" ");
        let nameString;
        let nameArray;
        if (item.length >2) {
            nameString = item.slice(1, item.length).join(" ");
            nameArray = item.slice(1, item.length);
        }else{
            nameString = item[1];
            nameArray = [item[1]];
        }
        return {
            item: nameString,
            quantity: item[0],
            category: specific_category(nameArray)
        }
    });
}
function specific_category(items){
    for (const key in Category) {
            const subCategory = Category[key];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if(!isNaN(parseInt(item))){
                   continue;
                }
                
                // const findItem = element.find(ele=>item.toUpperCase() === ele.toUpperCase());
                const findItem = subCategory.find(ele=>item.toUpperCase() === ele.toUpperCase() || item.toUpperCase() === ele.toUpperCase()+"S");
                if(findItem){
                    return key;
                }
                
            }
    }

    return "Default";
}



const Category = {
    Fruits : ["Apple","Banana","Orange"],
    Beverage : ["Milk","Coffee","Tea"],
    Vegetables : ["Tomatoe","Potatoe","Onion"],
    Meat : ["Chicken","Beef","Pork"],
    Bakery : ["Bread","Cake","Pastry"],
    Snacks : ["Chip","Nut","Popcorn"],
}

console.time("extract_items_and_quantity");
const output = extract_items_and_quantity("2 pack of APples , 2 Bananas  ,2   Cake   ,2 Nut , 3 Popcorn , 15 600 mil Milk , 1 Orange,1 Beef,2 Potatoe,1 Banana,2 pack of APples,1 Banana,1 Banana,1 Banana,3000 Coffee,1 Banana,1 Banana,1 Banana,3000 Coffee");
console.timeEnd("extract_items_and_quantity");
console.table(output);


console.time("extract_items_and_quantity2");
const output2 = extract_items_and_quantity("15 600 mil Milk");
console.timeEnd("extract_items_and_quantity2");
console.table(output2);

