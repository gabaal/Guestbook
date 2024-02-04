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
  form.reset();
  getMessages();
});

async function getMessages() {
  const messageContainer = document.getElementById("messageContainer");

  // Clear the messageContainer of previous results
  messageContainer.innerHTML = "";

  const response = await fetch(`${baseURL}/messages`);
  const messages = await response.json();

  // Loop through the messages
  messages.forEach(function (message) {
    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const h3 = document.createElement("h3");
    h3.textContent = message.message;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("type", "submit");

    // Append the message and delete button to the container
    messageItem.appendChild(h3);
    messageItem.appendChild(deleteButton);

    // Append the container to the main messageContainer
    messageContainer.appendChild(messageItem);

    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      handleDelete(message.id);
    });
  });
}

async function handleDelete(id) {
  const result = await fetch(`${baseURL}/messages/${id}`, {
    method: "DELETE",
  });

  console.log(result);

  if (result.ok) {
    getMessages();
  }
}

getMessages();
