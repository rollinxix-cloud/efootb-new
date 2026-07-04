function handleTournamentChange() {
    const selectedTourney = document.getElementById('tournamentSelector').value;
    const watermark = document.getElementById('cardWatermark');
    const s7Panel = document.getElementById('season7Panel');
    const scoreContainer = document.getElementById('cardScoreContainer');
    const perfBar = document.getElementById('cardPerfBar');

    watermark.innerText = selectedTourney;

    if (selectedTourney === 'ELITE DIV S7') {
        s7Panel.classList.remove('hidden');
        scoreContainer.classList.remove('hidden-element');
        perfBar.classList.remove('hidden-element'); // Show custom stats matrix on card
        handleMatchdayTypeChange(); // Ensure input configurations match selection state
    } else {
        s7Panel.classList.add('hidden');
        scoreContainer.classList.add('hidden-element');
        perfBar.classList.add('hidden-element'); // Hide custom stats matrix from card
    }
    updateCard();
}

// Manages hiding/showing paired score inputs matching selection specifications
function handleMatchdayTypeChange() {
    const mdValue = document.getElementById('mdSelector').value;
    const inputBlockB = document.getElementById('blockMD_B');
    const inputsGrid = document.querySelector('.s7-inputs-grid');
    
    const labelA = document.getElementById('labelMD_A');
    const labelB = document.getElementById('labelMD_B');

    if (mdValue === 'MD9') {
        inputBlockB.classList.add('hidden');
        inputsGrid.classList.add('single-layout');
        labelA.innerText = "MD 9 Score:";
    } else {
        inputBlockB.classList.remove('hidden');
        inputsGrid.classList.remove('single-layout');
        
        // Parse matches array structures from option strings dynamically
        const segments = mdValue.split('_'); // e.g. ["MD1", "MD2"]
        labelA.innerText = `${segments[0].replace('MD', 'MD ')} Score:`;
        labelB.innerText = `${segments[1].replace('MD', 'MD ')} Score:`;
    }
    updateCard();
}

function adjustImage() {
    const zoom = document.getElementById('zoomInput').value;
    const posX = document.getElementById('posXInput').value;
    const posY = document.getElementById('posYInput').value;
    const imgElement = document.getElementById('playerImage');
    
    if(imgElement.src && !imgElement.src.includes('data:image/gif;blank')) {
        imgElement.style.transform = `translate(${posX}px, ${posY}px) scale(${zoom})`;
    }
}

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.getElementById('playerImage');
        imgElement.src = event.target.result;
        imgElement.onload = function() {
            adjustImage();
        };
    }
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
}

function updateCard() {
    // Identity values
    document.getElementById('cardName').innerText = document.getElementById('nameInput').value.trim().toUpperCase() || 'AMAX HOOD';
    document.getElementById('cardRating').innerText = document.getElementById('ratingInput').value || '90';
    document.getElementById('cardYear').innerText = document.getElementById('yearInput').value.trim() || 'ELITE DIVISION LEAGUE S7';
    
    // Team Playstyle selection translation mapping
    document.getElementById('cardPlaystyle').innerText = document.getElementById('teamPlaystyleInput').value.toUpperCase();
    
    // Star ratings
    const totalStars = parseInt(document.getElementById('starRatingInput').value) || 5;
    document.getElementById('cardStars').innerText = '⭐'.repeat(totalStars);
    
    // Card skin variations
    const card = document.getElementById('card');
    card.className = `card ${document.getElementById('cardStyleInput').value}`;

    const selectedTourney = document.getElementById('tournamentSelector').value;
    
    // Process Season 7 Exclusive Matchdays and Core Stats
    if (selectedTourney === 'ELITE DIV S7') {
        // Update Core Performance Overlays
        document.getElementById('cardGS').innerText = document.getElementById('gsInput').value || '0';
        
        const currentCsGcLabel = document.getElementById('csGcSelector').value;
        document.getElementById('cardCsGcLabel').innerText = currentCsGcLabel;
        document.getElementById('cardCSGC').innerText = document.getElementById('csGcInput').value || '0';
        
        document.getElementById('cardAMG').innerText = document.getElementById('amgInput').value.trim() || '0.0';

        // Active Matchday array compiler loop
        const mdValue = document.getElementById('mdSelector').value;
        const scoreA = document.getElementById('scorelineInputA').value.trim() || '0-0';
        const scoreB = document.getElementById('scorelineInputB').value.trim() || '0-0';
        const container = document.getElementById('cardScoreContainer');
        
        container.innerHTML = ''; // Clear previous telemetry overlays safely
        
        if (mdValue === 'MD9') {
            container.innerHTML = `<div class="scoreline-badge">MD 9 | ${scoreA}</div>`;
        } else {
            const matchdays = mdValue.split('_'); // e.g. ["MD1", "MD2"]
            const badge1 = `<div class="scoreline-badge">${matchdays[0].replace('MD', 'MD ')} | ${scoreA}</div>`;
            const badge2 = `<div class="scoreline-badge">${matchdays[1].replace('MD', 'MD ')} | ${scoreB}</div>`;
            container.innerHTML = badge1 + badge2;
        }
    }
}

function downloadCard() {
    const targetElement = document.getElementById('card');
    
    html2canvas(targetElement, {
        scale: 3, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        const filename = document.getElementById('nameInput').value.trim().toLowerCase() || 'player';
        link.download = `${filename}-efootball-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

window.onload = function() {
    updateCard();
};
                                                 
