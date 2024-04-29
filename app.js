const emailInput = document.getElementById("emailInput");
const joinWaitlistBtn = document.getElementById("joinBtn");
const msgEl = document.getElementById("msgEl");
const loadingAnimation = document.getElementById("loadingAnimation"); // Reference to loading animation element

const errTimeOut = () => {
  msgEl.innerText = "";
};
// const valueFromInput = emailInput.value

joinWaitlistBtn.addEventListener("click", () => {
  const valueFromInput = emailInput.value;
  if (valueFromInput === "") {
    console.log("input is empty");

    msgEl.textContent = "Please enter your email";
    msgEl.style.color = "red";
    msgEl.style.display = "block";
  } else {
    loadingAnimation.style.display = "block";
    const users = {
      Email: valueFromInput,
    };

    fetch("https://649ac56abf7c145d023971ee.mockapi.io/api/V1/Users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify(users),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error: " + res.status);
      })
      .then((task) => {
        console.log(task);

        const successMsg = "Thanks For joining our waitlist";
        msgEl.innerText = successMsg;
        msgEl.style.color = "green";

        setTimeout(() => {
          errTimeOut();
        }, 8000);
        // do something with the new task
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        loadingAnimation.style.display = "none";
      });
  }
  // console.log("hello");

  // console.log(valueFromInput);
  const newTask = {
    content: "Check out mockapi.io",
    completed: false,
  };
});
