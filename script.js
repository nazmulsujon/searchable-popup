const users = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace"];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("userList");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");
  const addCategoryButton = document.getElementById("addCategoryButton");
  const categorySelectContainer = document.getElementById(
    "categorySelectContainer"
  );
  const categoryDropdownButton = document.getElementById(
    "categoryDropdownButton"
  );

  let selectedUsers = new Set();

  function renderCategories() {
    categorySelectContainer.innerHTML = "";
    const allCategory = document.createElement("div");
    allCategory.className = "category-item";
    allCategory.innerHTML = "<span>All</span>";
    categorySelectContainer.appendChild(allCategory);

    categories.forEach((category, index) => {
      const categoryItem = document.createElement("div");
      categoryItem.className = "category-item";
      const categorySpan = document.createElement("span");
      categorySpan.textContent = category;
      const deleteSpan = document.createElement("span");
      deleteSpan.textContent = "x";
      deleteSpan.className = "delete-option";
      deleteSpan.addEventListener("click", () => deleteCategory(index));
      categoryItem.appendChild(categorySpan);
      categoryItem.appendChild(deleteSpan);
      categorySelectContainer.appendChild(categoryItem);
    });
  }

  function deleteCategory(index) {
    categories.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
  }

  function addCategory() {
    const categoryName = prompt("Enter category name:");
    if (categoryName) {
      categories.push(categoryName);
      localStorage.setItem("categories", JSON.stringify(categories));
      renderCategories();
    }
  }

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

  function toggleDropdown(event) {
    const dropdown = event.currentTarget.parentElement;
    dropdown.classList.toggle("show");
  }

  function closeDropdowns(event) {
    if (
      !event.target.closest(".dropdown") &&
      !event.target.closest("#categoryDropdownButton")
    ) {
      document.querySelectorAll(".dropdown.show").forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    }
  }

  searchInput.addEventListener("input", renderUsers);
  filterSelect.addEventListener("change", renderUsers);
  addCategoryButton.addEventListener("click", addCategory);
  categoryDropdownButton.addEventListener("click", toggleDropdown);
  document.addEventListener("click", closeDropdowns);

  renderUsers();
  renderCategories();
});

function togglePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}
