function renderEmail() {
  const decoded = [];
  const sorted = ' _:!?.@=abceghijJlmnoprstuy';
  const numArray = [
    18, 8, 14, 17, 24, 20, 2, 13, 11, 17, 17, 20,
    1, 24, 13, 11, 22, 11, 6, 18, 14, 23, 24, 11,
    22, 21, 11, 8, 5, 18, 11, 4, 23, 25, 9, 15,
    11, 10, 24, 7, 16, 25, 23, 24, 0, 23, 8, 26,
    14, 19, 12, 0, 13, 11, 17, 17, 20, 3
  ];
  for (let i = 0; i < numArray.length; i += 1) {
    decoded.push(sorted[numArray[i]]);
  } 0;
  return decoded.join('');
}

const emailBtn = document.querySelectorAll('.render-mail');
emailBtn.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', () => {
    const anchor = document.createElement('a');
    anchor.href = renderEmail();
    anchor.click();
  });
});