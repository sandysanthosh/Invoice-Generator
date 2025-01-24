document.getElementById('add-item').addEventListener('click', () => {
    const container = document.getElementById('item-container');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <input type="text" placeholder="Item description" class="description" required>
        <input type="number" placeholder="Quantity" class="quantity" min="1" required>
        <input type="number" placeholder="Price" class="price" min="0" step="0.01" required>
        <button type="button" class="remove-item">Remove</button>
    `;
    container.appendChild(newItem);
});

document.getElementById('item-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        e.target.parentElement.remove();
    }
});

document.getElementById('invoice-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const invoiceDate = document.getElementById('invoiceDate').value;

    const items = Array.from(document.querySelectorAll('#item-container .item')).map(item => {
        return {
            description: item.querySelector('.description').value,
            quantity: parseInt(item.querySelector('.quantity').value),
            price: parseFloat(item.querySelector('.price').value),
            total: parseFloat(item.querySelector('.quantity').value) * parseFloat(item.querySelector('.price').value)
        };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

    const invoiceOutput = `
        <h2>Invoice</h2>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
        <table border="1" width="100%" style="border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.total.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <button onclick="window.print()">Print Invoice</button>
    `;

    document.getElementById('invoice-output').innerHTML = invoiceOutput;
});
