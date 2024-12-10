//Функция, которая получает список пользователей с публичного API
//и выводит их в консоль

export async function fetchUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {
        console.log(user.name);
      });
      return users;
    })
    .catch(error => console.error('Error fetching users:', error));
};

// fetchUsers();
