export const fetchAllUsers = async () => {
  try {
    const response = await fetch("/users");
    if (response.ok) {
      const users = await response.json();
      console.log(users);
      return users;
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching users");
  }
};
