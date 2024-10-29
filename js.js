function updateCount(elementId, change) {
  const input = document.getElementById(elementId);
  input.value = Math.max(0, parseInt(input.value) + change);
  if (elementId === 'totalBalls') updateTotalBalls();
  else if (elementId === 'redBalls') updateRedBalls();
}

function updateTotalBalls() {
  const totalInput = document.getElementById('totalBalls');
  const redInput = document.getElementById('redBalls');

  let totalValue = parseInt(totalInput.value) || 0;
  totalValue = Math.min(8, Math.max(0, totalValue));
  totalInput.value = totalValue;

  if (parseInt(redInput.value) > totalValue) redInput.value = totalValue;
  document.getElementById('remainingRed').textContent = redInput.value;
  document.getElementById('remainingBlue').textContent = totalValue - redInput.value;
  document.getElementById('redCountDisplay').textContent = redInput.value;
  document.getElementById('blueCountDisplay').textContent = totalValue - redInput.value;

  generateDropdowns(totalValue);
}

function updateRedBalls() {
  const totalInput = document.getElementById('totalBalls');
  const redInput = document.getElementById('redBalls');

  let redValue = parseInt(redInput.value) || 0;
  redValue = Math.min(parseInt(totalInput.value), Math.max(0, redValue));
  redInput.value = redValue;

  document.getElementById('remainingRed').textContent = redValue;
  document.getElementById('remainingBlue').textContent = totalInput.value - redValue;
  document.getElementById('redCountDisplay').textContent = redValue;
  document.getElementById('blueCountDisplay').textContent = totalInput.value - redValue;
}

function generateDropdowns(count) {
  const container = document.getElementById('dropdownsContainer');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'dropdown-container';

    const select = document.createElement('select');
    select.innerHTML = `<option value="unknown">未知</option>
                          <option value="red">实弹</option>
                          <option value="blue">空弹</option>`;
    select.id = `dropdown-${i}`;

    const confirmButton = document.createElement('button');
    confirmButton.textContent = '确认';
    confirmButton.onclick = () => confirmSelection(select, confirmButton);
    confirmButton.disabled = true;

    select.onchange = () => confirmButton.disabled = (select.value === 'unknown');

    div.appendChild(select);
    div.appendChild(confirmButton);
    container.appendChild(div);
  }
}

function confirmSelection(select, button) {
  const remainingRed = document.getElementById('remainingRed');
  const remainingBlue = document.getElementById('remainingBlue');

  if (select.value === 'red') remainingRed.textContent = Math.max(0, parseInt(remainingRed.textContent) - 1);
  else if (select.value === 'blue') remainingBlue.textContent = Math.max(0, parseInt(remainingBlue.textContent) - 1);

  select.disabled = true;
  button.disabled = true;
}

function resetAll() {
  document.getElementById('totalBalls').value = 0;
  document.getElementById('redBalls').value = 0;
  document.getElementById('redCountDisplay').textContent = 0;
  document.getElementById('blueCountDisplay').textContent = 0;
  document.getElementById('remainingRed').textContent = 0;
  document.getElementById('remainingBlue').textContent = 0;
  document.getElementById('dropdownsContainer').innerHTML = '';
}