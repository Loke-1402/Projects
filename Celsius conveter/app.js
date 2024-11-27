document.getElementById('convert-btn').addEventListener('click', function () {
    const celsius = parseFloat(document.getElementById('celsius').value);

    if (isNaN(celsius)) {
        document.getElementById('result').textContent = 'Please enter a valid number!';
        return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    document.getElementById('result').textContent = `${celsius}°C is equal to ${fahrenheit.toFixed(2)}°F.`;
});

