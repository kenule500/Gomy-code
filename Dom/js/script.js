

    document.addEventListener("DOMContentLoaded", function () {
      const totalPriceEl = document.querySelector(".total");

      function updateTotalPrice() {
        let total = 0;

        document.querySelectorAll(".product-body").forEach(card => {
          const unitPrice = parseInt(
            card.querySelector(".unit-price").textContent
          );
          const quantity = parseInt(
            card.querySelector(".quantity").textContent
          );

          total += unitPrice * quantity;
        });

        totalPriceEl.textContent = total + " $";
      }

      document.querySelectorAll(".product-body")
        .forEach(card => {

          const plusBtn = card.querySelector(".fa-plus-circle");
          const minusBtn = card.querySelector(".fa-minus-circle");
          const trashBtn = card.querySelector(".fa-trash-alt");
          const heartBtn = card.querySelector(".fa-heart");
          const quantityEl = card.querySelector(".quantity");

          plusBtn.addEventListener("click", () => {
            quantityEl.textContent = parseInt(quantityEl.textContent) + 1;
            updateTotalPrice();
          });

          minusBtn.addEventListener("click", () => {
            if (parseInt(quantityEl.textContent) > 0) {
              quantityEl.textContent =
                parseInt(quantityEl.textContent) - 1;
              updateTotalPrice();
            }
          });

          trashBtn.addEventListener("click", () => {
            card.remove();
            updateTotalPrice();
          });

          heartBtn.addEventListener("click", () => {
            heartBtn.classList.toggle("liked");      
        });
        });
    });
