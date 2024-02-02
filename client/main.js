const form = document.getElementById("messageForm");
const baseURL = "http://localhost:4321";
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  const response = await fetch(`${baseURL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  const json = await response.json();

  console.log(json);
  getMessages()
});

async function getMessages() {
  //clear the messageContainer of previous results
  document.getElementById("messageContainer").innerHTML = "";
  const response = await fetch(`${baseURL}/messages`);
  const messages = await response.json();
  // loop through the messages
  messages.forEach(function (message) {
    const h3 = document.createElement("h3");
    h3.textContent = message.message;
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.appendChild(h3);
  });

}

getMessages();