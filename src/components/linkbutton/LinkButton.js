export default function LinkButton({ 
  $target,
  initialState,
  onClick
}) {
  this.state = initialState;
  const $linkButton = document.createElement('div');
  $linkButton.id = this.state.id;
  $target.appendChild($linkButton);

  this.render = () => {
    $linkButton.textContent = this.state.text;
  }

  this.render();

  $linkButton.addEventListener('click', () => {
    onClick();
  })
}
