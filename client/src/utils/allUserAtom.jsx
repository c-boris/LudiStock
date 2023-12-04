export const fetchAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (response.ok) {
      const users = await response.json();
      console.log("allUserAtom:", users);
      return users;
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching users");
  }
};
