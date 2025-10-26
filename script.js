let accounts = [{name: 'Основной счёт', balance: 1500}];
let history = [];
let activeAccountIndex = 0;

function updateAccountSelect() {
    const select = document.getElementById('activeAccount');
    select.innerHTML = '';
    accounts.forEach((acc, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = acc.name;
        if(index === activeAccountIndex) option.selected = true;
        select.appendChild(option);
    });
}

function selectActiveAccount() {
    const select = document.getElementById('activeAccount');
    activeAccountIndex = parseInt(select.value);
}

function updateBalances() {
    const balancesDiv = document.getElementById('balances');
    balancesDiv.innerHTML = '';
    accounts.forEach(acc => {
        const div = document.createElement('div');
        div.className = 'account-balance';
        div.textContent = `${acc.name}: ${acc.balance} ₽`;
        balancesDiv.appendChild(div);
    });
    updateAccountSelect();
}

function updateHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    history.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function transfer() {
    const recipient = prompt('Введите имя получателя:');
    const amount = parseFloat(prompt('Введите сумму:'));
    if (!recipient || isNaN(amount) || amount <= 0) { alert('Некорректные данные'); return; }
    if (amount > accounts[activeAccountIndex].balance) { alert('Недостаточно средств'); return; }
    accounts[activeAccountIndex].balance -= amount;
    history.push(`Счёт ${accounts[activeAccountIndex].name}: перевод ${amount} ₽ -> ${recipient}`);
    updateBalances();
    updateHistory();
}

function deposit() {
    accounts[activeAccountIndex].balance += 500;
    history.push(`Счёт ${accounts[activeAccountIndex].name}: пополнение 500 ₽`);
    updateBalances();
    updateHistory();
}

function resetBank() {
    accounts = [{name: 'Основной счёт', balance: 1500}];
    history = [];
    activeAccountIndex = 0;
    updateBalances();
    updateHistory();
}

function earnMoney() {
    window.location.href = 'https://evuzi.github.io/Repo.labyby.game/';
}

function openNewAccount() {
    const accountName = prompt('Введите название нового счёта:', 'Новый счёт');
    if (!accountName) return;
    accounts.push({name: accountName, balance: 0});
    history.push(`Открыт новый счёт: ${accountName}`);
    activeAccountIndex = accounts.length - 1;
    updateBalances();
    updateHistory();
    alert(`Счёт "${accountName}" успешно создан!`);
}

function renameAccount() {
    const newName = prompt('Введите новое название счёта:', accounts[activeAccountIndex].name);
    if (!newName) return;
    history.push(`Счёт ${accounts[activeAccountIndex].name} переименован в ${newName}`);
    accounts[activeAccountIndex].name = newName;
    updateBalances();
    updateHistory();
}

function deleteAccount() {
    if(accounts.length <= 1) { alert('Нельзя удалить последний счёт!'); return; }
    const removed = accounts.splice(activeAccountIndex, 1)[0];
    history.push(`Счёт ${removed.name} удалён`);
    activeAccountIndex = Math.max(0, activeAccountIndex - 1);
    updateBalances();
    updateHistory();
}

updateBalances();
updateHistory();
