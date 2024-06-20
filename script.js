const users = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Ivy",
  "Jack",
  "Kathy",
  "Liam",
];

document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("userList");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");

  let selectedUsers = new Set();

  function renderUsers() {
    userList.innerHTML = "";
    const filter = filterSelect.value;
    const searchTerm = searchInput.value.toLowerCase();
    users.forEach((user) => {
      const isSelected = selectedUsers.has(user);
      if (
        (filter === "all" ||
          (filter === "selected" && isSelected) ||
          (filter === "unselected" && !isSelected)) &&
        user.toLowerCase().includes(searchTerm)
      ) {
        const userItem = document.createElement("div");
        userItem.className = "user-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isSelected;
        checkbox.addEventListener("change", () => toggleSelectUser(user));
        userItem.appendChild(checkbox);
        userItem.appendChild(document.createTextNode(user));
        userList.appendChild(userItem);
      }
    });
  }

  function toggleSelectUser(user) {
    if (selectedUsers.has(user)) {
      selectedUsers.delete(user);
    } else {
      selectedUsers.add(user);
    }
    renderUsers();
  }

  searchInput.addEventListener("input", renderUsers);
  filterSelect.addEventListener("change", renderUsers);

  renderUsers();
});

function togglePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}
