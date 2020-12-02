// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const minWeightInput = document.querySelector('.minweight__input'); // поле с мин. весом
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с макс. весом
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

const removeFruits = () => {
  while (fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild);
  }
};

const color = fruitColor => {
  switch (fruitColor) {
     case "фиолетовый": return "fruit_violet";
     break;
     case "зеленый": return "fruit_green";
     break;
     case "розово-красный": return "fruit_carmazin";
     break;
     case "желтый": return "fruit_yellow";
     break;
     case "светло-коричневый": return "fruit_lightbrown";
     break;
     case "абрикос": return "fruit_apricot";
     break;
     case "яблочно-зелёный": return "fruit_apple_green";
     break;
     case "лайм": return "fruit_lime";
     break;
     default: return "fruit_wheat"
     break;
  }
}

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  removeFruits();

  fruits.forEach((fruit, index) => {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const newLi = document.createElement("li");
    newLi.className = `fruit__item ${color(fruit.color)}`;
    const fruitInfoDiv = document.createElement("div");
    fruitInfoDiv.className = 'fruit__info';
    const fruitIndexDiv = document.createElement("div");
    const fruitKind = document.createElement("div");
    const fruitColor = document.createElement("div");
    const fruitWeight = document.createElement("div");
    fruitIndexDiv.innerText = `index: ${index}`;
    fruitKind.innerText = `kind: ${fruit.kind}`;
    fruitColor.innerText = `color: ${fruit.color}`;
    fruitWeight.innerText = `weight (кг): ${fruit.weight}`;
    fruitInfoDiv.appendChild(fruitIndexDiv);
    fruitInfoDiv.appendChild(fruitKind);
    fruitInfoDiv.appendChild(fruitColor);
    fruitInfoDiv.appendChild(fruitWeight);
    fruitsList.appendChild(newLi).appendChild(fruitInfoDiv);
  });
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let oldFruits = fruits.slice();
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let randomIndex = getRandomInt(0,fruits.length-1);
    result.push(fruits.slice(randomIndex, randomIndex + 1)[0]);
    fruits.splice(randomIndex, 1);
  }

  fruits = result;
  if (JSON.stringify(oldFruits) === JSON.stringify(fruits)) {
    alert("Фрукты не перемешались");
  } 
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
  sortTimeLabel.textContent = '-';
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = (minWeght, maxWeight) => {
  const result = fruits.filter((item) => {
    // TODO: допишите функцию
    return item.weight >= minWeght && item.weight <= maxWeight;

  });
  fruits = result;
};

filterButton.addEventListener('click', () => {
  let oldFruits = fruits.slice();
  let minWeght = minWeightInput.value;
  let maxWeght = maxWeightInput.value;
  if (!minWeght || !maxWeght) {
    alert ("Введите значения в поля \"min weight\" и  \"max weight.\"");
    return;
  }
  filterFruits(minWeght, maxWeght);
  display();
  fruits = oldFruits.slice();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  // на основе сравнения строковых значений
  return a.color < b.color ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-1-i; j++) { 
            if (comparation(arr[j+1], arr[j])) { 
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp;
            }
        }
    }   
  },

  // функция обмена элементов
  swap (arr, firstIndex, secondIndex) {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  },

  // функция разделитель
  partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (comparationColor(items[i], pivot)) {
            i++;
        }
        while (comparationColor(pivot, items[j])) {
            j--;
        }
        if (i <= j) {
            sortAPI.swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
 },

  quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = sortAPI.partition(items, left, right);
        if (left < index - 1) {
          sortAPI.quickSort(items, left, index - 1);
        }
        if (index < right) {
          sortAPI.quickSort(items, index, right);
        }
    }
    return items;
 },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation, left, right) {
    const start = new Date().getTime();
    sort(arr, comparation, left, right);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

let toggle = 0;
sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  toggle = !toggle;
  sortKind = sortKindLabel.textContent = toggle ? "quickSort" : "bubbleSort";
  sortTimeLabel.textContent = '-';
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  //quickSorting(fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let kind = kindInput.value;
  let color = colorInput.value;
  let weight = weightInput.value;
  if (!kind || !color || !weight) {
    alert("Заполните поля  \"kind\", \"color\", \"weigh\"");
    return;
  }
  fruits.push({kind: kind, color: color, weight: weight});
  display();
  kindInput.value = colorInput.value = weightInput.value = '';
});

let colorsToChoose = document.querySelectorAll('.additionalColor');
//console.log(colorsToChoose);
colorsToChoose.forEach(item => {
  item.addEventListener('click', (event) => {
    switch (event.currentTarget.classList[1]) {
      case "fruit_apricot": colorInput.value = "абрикос";
      break;
      case "fruit_apple_green": colorInput.value = "яблочно-зелёный";
      break;
      case "fruit_lime": colorInput.value = "лайм";
      break;
      default: return;
    }
    //colorInput.value = event.currentTarget.classList[1];
  });
});