
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("typing-text");
  
  const textToType = " 스케줄 관리\n 홈페이지 ";
  const typingSpeed = 400; // 글자당 밀리초

  function typeText(text, index) {
      if (index < text.length) {
          textElement.innerText += text.charAt(index);
          setTimeout(function () {
              typeText(text, index + 1);
          }, typingSpeed);
      }
  }

  typeText(textToType, 0);
});

var homePage = document.getElementById("home");
var coursesPage = document.getElementById("courses");
var photoPage = document.getElementById("photo");

var menuLinks = document.querySelectorAll(".menu a");

for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function() {
        this.classList.add("active");

        var pageId = this.getAttribute("href");
        var page = document.getElementById(pageId);

        if (pageId === "#home") {
            homePage.innerHTML = page.innerHTML;
        } else if (pageId === "#courses") {
            coursesPage.innerHTML = page.innerHTML;
        } else {
            photoPage.innerHTML = page.innerHTML;
        }
    });
}

 
