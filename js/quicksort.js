function swap(items, firstIndex, secondIndex){
   const temp = items[firstIndex];
   items[firstIndex] = items[secondIndex];
   items[secondIndex] = temp;
}

// функция разделитель
function partition(items, left, right) {
   var pivot = items[Math.floor((right + left) / 2)],
       i = left,
       j = right;
   while (i <= j) {
       while (items[i] < pivot) {
           i++;
       }
       while (items[j] > pivot) {
           j--;
       }
       if (i <= j) {
           console.log(`i ${i} j ${j}`)
           swap(items, i, j);
           i++;
           j--;
       }
   }
   return i;
}

// алгоритм быстрой сортировки
function quickSort(items, left, right) {
   var index;
   if (items.length > 1) {
       left = typeof left != "number" ? 0 : left;
       right = typeof right != "number" ? items.length - 1 : right;
       index = partition(items, left, right);
       if (left < index - 1) {
           quickSort(items, left, index - 1);
       }
       if (index < right) {
           quickSort(items, index, right);
       }
   }
   return items;
} 

// список фруктов в JSON формате
let fruitsJSON = `[
    {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
    {"kind": "Дуриан", "color": "зеленый", "weight": 35},
    {"kind": "Личи", "color": "розово-красный", "weight": 17},
    {"kind": "Карамбола", "color": "желтый", "weight": 28},
    {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22},
    {"kind": "Что-то еще", "color": "оранжевый", "weight": 31}
  ]`;
  
  // преобразование JSON в объект JavaScript
  let fruits = JSON.parse(fruitsJSON);
  var unsorted = [];//[23, 45, 16, 37, 3, 99, 22];
  fruits.forEach(item => unsorted.push(item.color));

var sorted = quickSort(unsorted);

console.log(unsorted);
console.log(sorted);