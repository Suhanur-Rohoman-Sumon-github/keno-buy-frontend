export const initializeUserData = () => {
  if (typeof window === "undefined") return;

  let userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    // Generate random email
    userEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
    localStorage.setItem("userEmail", userEmail);
  

    // Initialize empty cart
    localStorage.setItem("cart", JSON.stringify([]));
  } else {
    // Ensure cart exists even if userEmail already exists
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }
};
