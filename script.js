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
        highlightedText += `<span style="color: #22c55e;">${char}</span>`;

        if (i - 1 >= 3) {
          isHttps = false;
        }
      } else if (char === ':' || char === '/') {
        highlightedText += `<span style="color: #eab308;">${char}</span>`;
      } else if (paragraphText.substring(i, i + 3) === '://') {
        highlightedText += `<span style="color: #eab308;">://</span>`;
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

    $(menu).animate({
      maxHeight: '300px'
    }, 150); // Animate to 300px over 500ms
    $(menu).animate({
      marginBottom: '26px'
    }, 0); // Animate to 300px over 500ms
    $(menu).css('height', 'unset');
  } else {
    $(menu).animate({
      maxHeight: '0px'
    }, 150); // Animate to 300px over 500ms
    $(menu).animate({
      marginBottom: '0px'
    }, 0); // Animate to 300px over 500ms
    $(menu).css('height', 'unset');

  }
}




document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  const buttons = document.querySelectorAll('.style-button');
  let currentStylesheet = null;

  console.log(`Found ${buttons.length} buttons (expecting 9)`);

  // Create and append the stylesheet link element
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.id = 'dynamic-stylesheet';
  document.head.appendChild(styleLink);
  console.log('Created dynamic stylesheet link element:', styleLink);

  // Add click handlers to all buttons
  buttons.forEach((button, index) => {
    button.addEventListener('click', function () {
      console.log(`Button ${index + 1} clicked: ${button.textContent}`);

      // Remove-all button logic
      if (this.id === 'remove-all') {
        console.log('Remove-all button triggered');

        if (!currentStylesheet) {
          console.log('No stylesheet active - nothing to remove');
          return;
        }

        styleLink.href = '';
        currentStylesheet = null;
        buttons.forEach(btn => btn.classList.remove('active'));

        console.log('All stylesheets removed');
        console.log('Current stylesheet:', currentStylesheet);
        console.log('Active link href:', styleLink.href);
        return;
      }

      // Regular style button logic
      const stylesheet = this.getAttribute('data-stylesheet');
      console.log(`Attempting to load: ${stylesheet}`);

      // Skip if already active
      if (currentStylesheet === stylesheet) {
        console.log('Stylesheet already active - no change needed');
        return;
      }

      // Load new stylesheet
      styleLink.href = stylesheet;
      currentStylesheet = stylesheet;

      // Update button states
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      console.log(`Stylesheet switched to: ${stylesheet}`);
      console.log('Current stylesheet:', currentStylesheet);
      console.log('Active link href:', styleLink.href);
      console.log(`Button "${button.textContent}" set to active state`);

      // Verify the stylesheet loaded
      styleLink.onload = function () {
        console.log(`Verified ${stylesheet} loaded successfully`);
      };

      styleLink.onerror = function () {
        console.error(`Failed to load ${stylesheet}`);
      };
    });
  });

  console.log('Event listeners attached to all buttons');
  console.log('Initial state - no stylesheet active:', currentStylesheet);
});


$(document).ready(function () {
  $('.cheatsheet_position_image').click(function () {
    $('.cheatsheet_image, .cheatsheet_title').toggleClass('visible');
  });
});


var tooltip = document.querySelectorAll('.coupontooltip');

document.addEventListener('mousemove', fn, false);

function fn(e) {
  for (var i = tooltip.length; i--;) {
    tooltip[i].style.left = e.pageX + 'px';
    tooltip[i].style.top = e.pageY + 'px';
  }
}


document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.copyable_code');
    const paragraph = container.querySelector('p.color');
    const textToCopy = paragraph?.innerText?.trim(); // Safe access + trim

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const span = button.querySelector('span');
        const originalText = span.textContent;
        span.textContent = 'Copied!';

        setTimeout(() => {
          span.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
        alert('Clipboard copy failed. Try running this on localhost or HTTPS.');
      });
    }
  });
});


document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.copyable_code');
    const pre = container.querySelector('pre');

    if (pre) {
      const textToCopy = pre.innerText.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        const span = button.querySelector('span');
        const originalText = span.textContent;
        span.textContent = 'Copied!';

        setTimeout(() => {
          span.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
        alert('Clipboard copy failed. Try running this on localhost or HTTPS.');
      });
    }
  });
});