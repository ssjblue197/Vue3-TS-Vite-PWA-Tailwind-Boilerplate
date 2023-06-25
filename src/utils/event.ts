export const attackClickOutSide = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    document.addEventListener('click', function(event: any) {
      const isClickedOutside = !element.contains(event.target);
  
      if (isClickedOutside) {
        // The click was outside of the element
        // Perform your desired actions here
      }
    });
  }
}