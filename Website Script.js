let itemCount = 1;

function addOrderItem() {
    itemCount++;
    const orderItemsDiv = document.getElementById('orderItems');
    const newOrderItemDiv = document.createElement('div');
    newOrderItemDiv.classList.add('orderItem');
    newOrderItemDiv.innerHTML = `
        <label for="food${itemCount}">Food Item:</label>
        <input type="text" id="food${itemCount}" name="food" required>

        <label for="quantity${itemCount}">Quantity:</label>
        <input type="number" id="quantity${itemCount}" name="quantity" required>
    `;
    orderItemsDiv.appendChild(newOrderItemDiv);
}

document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const orderItems = [];

    for (let i = 1; i <= itemCount; i++) {
        const food = document.getElementById(`food${i}`).value;
        const quantity = document.getElementById(`quantity${i}`).value;
        orderItems.push({ food, quantity });
    }

    fetch('/api/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, orderItems }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Request submitted successfully!');
        document.getElementById('requestForm').reset();
        itemCount = 1;
        document.getElementById('orderItems').innerHTML = `
            <div class="orderItem">
                <label for="food1">Food Item:</label>
                <input type="text" id="food1" name="food" required>

                <label for="quantity1">Quantity:</label>
                <input type="number" id="quantity1" name="quantity" required>
            </div>
        `;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting request');
    });
});