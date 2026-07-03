let currentCategory = 'OVERALL';
let uploadedImgData = '';

function switchSection(sectionId) {
    // Update menu UI highlights
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Process section ID name values cleanly
    currentCategory = sectionId.replace('-', ' ').toUpperCase();
    document.getElementById('cardWatermark').innerText = currentCategory;
    updateCard();
}

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        uploadedImgData = event.target.result;
        document.getElementById('cardPlayerImg').src = uploadedImgData;
    }
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
}

function updateCard() {
    // Grab text inputs
    const name = document.getElementById('nameInput').value.trim().toUpperCase() || 'GAMER NAME';
    const rating = document.getElementById('ratingInput').value || '105';
    const season = document.getElementById('yearInput').value.trim() || '2026/27';
    
    // Grab dynamic stats inputs
    const gs = document.getElementById('gsInput').value || '0';
    const cs = document.getElementById('csInput').value || '0';
    const amr = document.getElementById('amrInput').value || '0.00';
    
    // Dynamic theme changer logic
    const cardElement = document.getElementById('card');
    const selectedStyle = document.getElementById('cardStyleInput').value;
    
    cardElement.className = `card ${selectedStyle}`;
    
    // Push updates live into card structures
    document.getElementById('cardName').innerText = name;
    document.getElementById('cardRating').innerText = rating;
    document.getElementById('cardYear').innerText = season;
    document.getElementById('cardGS').innerText = gs;
    document.getElementById('cardCS').innerText = cs;
    document.getElementById('cardAMR').innerText = amr;
}

function downloadCard() {
    const card = document.getElementById('card');
    html2canvas(card, {
        useCORS: true,
        scale: 3, // Premium crystal clear export resolution multiplier
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        const nameFile = document.getElementById('nameInput').value.trim().toLowerCase() || 'player';
        link.download = `${nameFile}-perf-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
