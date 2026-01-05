// Selectăm elementele din DOM
const setupElement = document.getElementById('setup');
const punchlineElement = document.getElementById('punchline');
const generateBtn = document.getElementById('new-joke-btn');
const loading = document.getElementById('loading');

// URL-ul API-ului
const apiUrl = 'https://official-joke-api.appspot.com/random_joke';

// Funcția asincronă pentru a obține o glumă
async function getJoke() {
    // Afișăm loading și dezactivăm butonul
    loading.classList.remove('hidden');
    generateBtn.disabled = true;
    punchlineElement.classList.remove('show');

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Eroare HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        // Animație pentru setup
        setupElement.classList.remove('fade-in');
        void setupElement.offsetWidth; // Trigger reflow
        setupElement.classList.add('fade-in');
        setupElement.textContent = data.setup;

        // Afișăm punchline cu delay pentru efect comic
        punchlineElement.textContent = data.punchline;
        setTimeout(() => {
            punchlineElement.classList.add('show');
        }, 1500);

    } catch (error) {
        console.error('Eroare:', error);
        setupElement.textContent = 'Oops! Nu am putut încărca gluma.';
        setupElement.classList.add('shake');
        setTimeout(() => setupElement.classList.remove('shake'), 500);
        punchlineElement.textContent = '';
    } finally {
        loading.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// Event listener pe buton
generateBtn.addEventListener('click', getJoke);