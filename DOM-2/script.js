document.addEventListener("DOMContentLoaded", function () {
  var colorBox = document.getElementById("color-box");
  var button = document.getElementById("change-color-btn");

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * 16);
      color = color + letters[randomIndex];
    }

    return color;
  }

  button.addEventListener("click", function () {
    var randomColor = getRandomColor();
    colorBox.style.backgroundColor = randomColor;
  });
});
