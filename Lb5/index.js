const numberInput = document.getElementById('number-input');
const categorySelect = document.getElementById('category-select');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');

searchBtn.addEventListener('click', searchFact);

numberInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchFact();
    }
});

async function searchFact() {
    const number = numberInput.value.trim();
    const category = categorySelect.value;
    
    if (!number) {
        showResult('Пожалуйста, введите число', false);
        return;
    }

    loading.classList.remove('hidden');
    result.classList.add('hidden');
    
    try {
        const response = await fetch(`http://numbersapi.com/${number}/${category}?json`);
        const data = await response.json();
        
        if (data.found) {
            showResult(data.text, true);
        } else {
            const message = category === 'year' 
                ? `${number} - скучный год`
                : `${number} - скучное число`;
            showResult(message, false);
        }
    } catch (error) {
        showResult('Произошла ошибка при загрузке факта. Попробуйте позже.', false);
    } finally {
        loading.classList.add('hidden');
    }
}

function showResult(text, isFound) {
    result.classList.remove('hidden');
    result.className = 'result';
    
    if (isFound) {
        result.classList.add('found');
        result.innerHTML = `
            <h3>Интересный факт:</h3>
            <p>${text}</p>
        `;
    } else {
        result.classList.add('not-found');
        result.innerHTML = `
            <h3>Информация:</h3>
            <p>${text}</p>
        `;
    }
}