function highlightHttpsAndSymbols() {
  const colorParagraphs = document.querySelectorAll('p.color');

  colorParagraphs.forEach(paragraph => {
    let paragraphText = paragraph.innerHTML;
    let highlightedText = '';
    let isHttps = false;

    for (let i = 0; i < paragraphText.length; i++) {
      const char = paragraphText[i];

      if (paragraphText.substring(i, i + 5).toLowerCase() === 'https') {
        isHttps = true;
      }

      if (isHttps) {
        highlightedText += `<span style="color: green;">${char}</span>`;

        if (i - 1 >= 3) {
          isHttps = false;
        }
      } else if (char === ':' || char === '/') {
        highlightedText += `<span style="color: yellow;">${char}</span>`;
      } else if (paragraphText.substring(i, i + 3) === '://') {
        highlightedText += `<span style="color: yellow;">://</span>`;
        i += 2; // Skip the rest of "://"
      } else {
        highlightedText += char;
      }
    }

    paragraph.innerHTML = highlightedText;
  });
}

window.addEventListener('load', highlightHttpsAndSymbols);


$(document).ready(function () {
  $(".toggle-button").click(function () {
    // Find the sub-menu associated with the clicked button
    const $subMenu = $(this).next(".sub-menu");
   console.log("test");
    // Toggle the sub-menu's height
    if ($subMenu.height() === 0) {
      // Expand the sub-menu to its full height based on content
       
      $subMenu.animate({
        height: $subMenu.get(0).scrollHeight
      }, 150);
  
    } else {
      // Collapse the sub-menu back to 0
      $subMenu.animate({
        height: 0
      }, 150);
      
    }
  });
});


// rotating button

const buttons = document.querySelectorAll('.toggle-button');
// Add a single event listener to a parent element (e.g., the document or a container)
document.addEventListener('click', (event) => {
  // Check if the clicked element is a .main-button OR a child of .main-button
  const button = event.target.closest('.toggle-button');
  if (button) {
    // Find the .arrow child of the clicked button
    const arrow = button.querySelector('.arrow');
    // Toggle the 'rotated' class on the arrow
    arrow.classList.toggle('rotated');
  
  }
    
});

  
    







const accordionHeaders = document.querySelectorAll(".accordion-header");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector(".accordion-content");

    accordionContents.forEach((content) => {
      if (content !== accordionContent) {
        content.classList.remove("active");
        content.style.maxHeight = "0";
      }
    });

    accordionContent.classList.toggle("active");

    if (accordionContent.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = "0";
    }
  });
});


function toggleMenu(menuId) {
  const menu = document.getElementById(menuId);
  if (menu.style.maxHeight === "0px" || menu.style.maxHeight === "") {

      $(menu).animate({ maxHeight: '300px' }, 150); // Animate to 300px over 500ms
      $(menu).animate({ marginBottom: '26px' }, 0); // Animate to 300px over 500ms
     $(menu).css('height', 'unset');
  } else {
    $(menu).animate({ maxHeight: '0px' }, 150); // Animate to 300px over 500ms
      $(menu).animate({ marginBottom: '0px' }, 0); // Animate to 300px over 500ms
        $(menu).css('height', 'unset');
     
  }
}
