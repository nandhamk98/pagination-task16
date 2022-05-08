let pagination = document.querySelector("#pagination");
pagination.setAttribute("class", "d-inline-flex");
let data_id = document.querySelector("#data-id");
let data_name = document.querySelector("#data-name");
let data_email = document.querySelector("#data-email");
let pages = document.createElement("div");
pages.setAttribute("class", "d-inline-flex");
let current = 1;
let previousVal = current > 1 ? current - 1 : current;
let nextVal = current < 100 ? current + 1 : current;

const fetchData = async () => {
  let data = await fetch(
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );
  let newData = await data.json();
  return newData;
};

const pagesBetween = (data) => {
  let start = parseInt(current / 5) * 5;
  let end = (parseInt(current / 5) + 2) * 5;
  console.log(start, end, parseInt(current / 10) + 2);
  if (current <= 100) {
    pages.innerHTML = "";
    for (
      let i = start < 5 ? start + 1 : start;
      i <= end && i <= data.length;
      i++
    ) {
      let but = document.createElement("button");
      but.innerHTML = i;
      but.setAttribute("id", i);
      but.setAttribute("class", "d-flex justify-content-center");
      but.addEventListener("click", () => {
        removeSelectedOption();
        current = i;
        displayContent(data[i - 1]);
        displayPages(data);
      });
      pages.appendChild(but);
    }
  }
  pagination.appendChild(pages);
  addSelectedOption();
};

const displayPages = (data) => {
  pagination.innerHTML = "";
  console.log(current);
  // addSelectedOption();
  includeFirst(data);
  includePrevious(data);
  pagesBetween(data);
  includeNext(data);
  includeLast(data);
};

const includePrevious = (data) => {
  let previous = document.createElement("button");
  previous.innerHTML = "Previous";
  previous.setAttribute("class", "d-flex justify-content-center");
  previous.addEventListener("click", () => {
    if (current > 1) {
      removeSelectedOption();
      displayContent(data[current - 2]);
      current -= 1;
      displayPages(data);
    }
  });
  pagination.appendChild(previous);
};

const includeNext = (data) => {
  let next = document.createElement("button");
  next.innerHTML = "Next";
  next.setAttribute("class", "d-flex justify-content-center");
  next.addEventListener("click", () => {
    if (current < 100) {
      console.log(current + 1);
      removeSelectedOption();
      displayContent(data[current]);
      current += 1;
      displayPages(data);
    }
  });
  pagination.appendChild(next);
};

const includeFirst = (data) => {
  let first = document.createElement("button");
  first.innerHTML = "First";
  first.setAttribute("class", "d-flex justify-content-center");
  first.addEventListener("click", () => {
    removeSelectedOption();
    current = 1;
    displayContent(data[0]);
    displayPages(data);
  });
  pagination.appendChild(first);
};

const includeLast = (data) => {
  let last = document.createElement("button");
  last.innerHTML = "Last";
  last.setAttribute("class", "d-flex justify-content-center");
  last.addEventListener("click", () => {
    removeSelectedOption();
    current = 100;
    displayContent(data[data.length - 1]);
    displayPages(data);
  });
  pagination.appendChild(last);
};

const displayCurrent = (data) => {
  displayContent(data[current - 1]);
};

const addSelectedOption = () => {
  let selectedBtn = document.getElementById(`${current}`);
  console.log(current);
  console.log(selectedBtn);
  selectedBtn.classList.add("selected");
};

const removeSelectedOption = () => {
  let selectedBtn = document.getElementById(`${current}`);
  console.log(selectedBtn);
  selectedBtn.classList.remove("selected");
};

const displayContent = (val) => {
  data_id.innerHTML = val.id;
  data_name.innerHTML = val.name;
  data_email.innerHTML = val.email;
};

const createPagination = async () => {
  let data = await fetchData();
  displayPages(data);
  displayCurrent(data);
};

document.addEventListener("DOMContentLoaded", createPagination);
