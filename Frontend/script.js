// Function to fetch and display users
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users');
    const users = await response.json();

    const userList = document.getElementById('userList');

    users.forEach((user) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<h2>${user.user_name}</h2><p>Email: ${user.email}</p>`;
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Function to fetch and display users
async function fetchCats() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/cats');
    const cats = await response.json();
    console.log('cats: ', cats);

    const catList = document.getElementById('catList');

    cats.forEach((cat) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<h2>${cat.cat_name}</h2><p>Weight: ${cat.weight}</p><br><p>Birthdate: ${cat.birthdate}</p><br><p>Owner: ${cat.owner.user_name}</p>`;
      catList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the fetchUsers function when the page loads
window.onload = () => {
  fetchUsers();
  fetchCats();
};
