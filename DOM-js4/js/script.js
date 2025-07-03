$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });
});
function handelColorClick(event) {
  const clickedElement = event.target;
  const color = clickedElement.id;
  console.log(color);

  const liElements = document.querySelectorAll("li");
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].classList.remove("s");
    liElements[i].style.backgroundColor = "";
  }

  clickedElement.classList.add("active");

  switch (color) {
    case "1-st":
      clickedElement.style.backgroundColor = "red";
      break;
    case "2-nd":
      clickedElement.style.backgroundColor = "green";
      break;
    case "3-rd":
      clickedElement.style.backgroundColor = "blue";
      break;
    default:
      clickedElement.style.backgroundColor = "";
  }
}
