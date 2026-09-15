const firstSelect = document.querySelector("#currency_one");
const secondSelect = document.querySelector("#currency_two");
const firstAmount = document.querySelector("#amount_one");
const secondAmount = document.querySelector("#amount_two");
const swapBtn = document.querySelector(".swap");
const preciseDiv = document.querySelector(".precise");

async function runExchange() {
  let firstSelectValue = firstSelect.value;
  let firstAmountValue = parseFloat(firstAmount.value);
  let secondSelectValue = secondSelect.value;
  const url = `https://api.exchangerate-api.com/v4/latest/${firstSelectValue}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("The response is failed.");
    }
    const data = await response.json();
    const currencyObj = data.rates;
    const conversion = firstAmountValue * currencyObj[secondSelectValue];
    preciseDiv.textContent = `1 ${firstSelectValue} = ${currencyObj[secondSelectValue]} ${secondSelectValue}`;
    secondAmount.value = conversion.toFixed(2);
    console.log(currencyObj);
  } catch (e) {
    console.log(e.message);
  }
}

firstAmount.addEventListener("input", runExchange);
firstSelect.addEventListener("change", runExchange);
secondSelect.addEventListener("change", runExchange);
swapBtn.addEventListener("click", () => {
  const temp = firstSelect.value;
  firstSelect.value = secondSelect.value;
  secondSelect.value = temp;
  runExchange();
});
runExchange();
