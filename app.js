//TODO: If inputs are not nullable, remove alert. Else don't remove alert since fill inputs.

//Listen for submit
const results = document.getElementById("results");
const loading = document.getElementById("loading");
const submitBtn = document.getElementById("submit-btn");

document.getElementById("loan-form").addEventListener("submit", (e) => {
  //Hide results
  results.style.display = "none";

  //Show Loading
  loading.style.display = "block";

  setTimeout(() => {
    calculateResults();
  }, 2000);
  submitBtn.disabled = true;
  e.preventDefault();
});

//Calculate Results
function calculateResults() {
  //UI Vars
  console.log(this);
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(3).toString() + " $";
    totalPayment.value =
      (monthly * calculatedPayments).toFixed(3).toString() + " $";
    totalInterest.value =
      (monthly * calculatedPayments - principal).toFixed(3).toString() + " $";

    //Show result
    results.style.display = "block";
    submitBtn.disabled = false;

    //Hide Loading
    loading.style.display = "none";
  } else {
    showError(
      "If you want to do calculate, please check your numbers and required all inputs!"
    );
  }
}

function showError(errorMessage) {
  //Hide Loading,results
  results.style.display = "none";
  loading.style.display = "none";
  //Get my-alert content on HTML
  const myAlert = document.getElementById("my-alert");

  //Dynamically create custom alert on Bootstrep
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger mt-3";
  errorDiv.id = "danger-alert";
  errorDiv.innerHTML = `<h4 class="alert-heading">Something went wrong...</h4>
              <p>${errorMessage}</p>`;

  myAlert.appendChild(errorDiv);
  setTimeout(() => {
    errorDiv.style.display = "none";
    submitBtn.disabled = false;
  }, 7000);
}
