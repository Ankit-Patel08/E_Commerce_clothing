function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;
  });

  const elements = document.querySelectorAll("#cart-count");

  elements.forEach((el) => {
    el.innerText = count;
    el.style.display = count === 0 ? "none" : "block";
  });
}



document.addEventListener("DOMContentLoaded", () => {
   updateCartCount();
  // NAVBAR (keep this if you already have it)
  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const nav = document.getElementById("navbar");

  if (bar) {
    bar.addEventListener("click", () => {
      nav.classList.add("active");
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }

  // 🛒 ADD TO CART (IMPROVED VERSION)
  document.addEventListener("click", function (e) {
    const button = e.target.closest(".pro a");

    // if click is not on cart button → ignore
    if (!button) return;

    e.preventDefault();

    console.log("Clicked ✅");

    const product = button.closest(".pro");

    const name = product.querySelector(".des h5").innerText;

    const price = product
      .querySelector(".des h4")
      .innerText.replace("₹", "")
      .replace(".00", "");

    const image = product.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      name,
      price,
      image,
      quantity: 1,
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    const toast = document.getElementById("cart-toast");

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  });
});
