function updateCard() {
    // Basic text updates
    document.getElementById('cardName').innerText = document.getElementById('nameInput').value || 'GAMER NAME';
    document.getElementById('cardRating').innerText = document.getElementById('ratingInput').value || '00';
    document.getElementById('cardYear').innerText = document.getElementById('yearInput').value || 'SEASON';
    document.getElementById('cardPlaystyle').querySelector('span').innerText = document.getElementById('teamPlaystyleInput').value;
    
    // Rating/Star logic
    const stars = document.getElementById('starRatingInput').value;
    document.getElementById('cardStars').innerText = '⭐'.repeat(stars);

    // Stats Bar
    document.getElementById('cardGS').innerText = document.getElementById('gsInput').value;
    document.getElementById('cardCSGC').innerText = document.getElementById('csGcInput').value;
    document.getElementById('cardCsGcLabel').innerText = document.getElementById('csGcSelector').value;
    document.getElementById('cardAMG').innerText = document.getElementById('amgInput').value;

    // Champion Status
    const isChampion = document.getElementById('championToggle').checked;
    const championBadge = document.getElementById('cardChampionBadge');
    const championText = document.getElementById('championBadgeText');
    const card = document.getElementById('card');

    if (isChampion) {
        championText.innerText = document.getElementById('championSeasonInput').value === "Season 3 Champion" ? "🏆 S3 CHAMPION" : "🏆 S5 CHAMPION";
        championBadge.classList.remove('hidden-element');
        card.classList.add('champion-glow-active');
    } else {
        championBadge.classList.add('hidden-element');
        card.classList.remove('champion-glow-active');
    }
}

function toggleChampionSelector() {
    const isChecked = document.getElementById('championToggle').checked;
    const container = document.getElementById('championSelectContainer');
    if (isChecked) container.classList.remove('hidden');
    else container.classList.add('hidden');
    updateCard();
}

function handleTournamentChange() {
    const val = document.getElementById('tournamentSelector').value;
    const watermark = document.getElementById('cardWatermark');
    watermark.innerText = val;
    
    const s7Panel = document.getElementById('season7Panel');
<<<<<<< HEAD
    const perfBar = document.getElementById('cardPerfBar');
    const scoreContainer = document.getElementById('cardScoreContainer');
=======
    const scoreContainer = document.getElementById('cardScoreContainer');
    const perfBar = document.getElementById('cardPerfBar');
>>>>>>> cb3a6e45c1bb47caedf9f19cd9293113bef61efe

    if (val === "ELITE DIV S7") {
        s7Panel.classList.remove('hidden');
<<<<<<< HEAD
        perfBar.classList.remove('hidden-element');
        scoreContainer.classList.remove('hidden-element');
    } else {
        s7Panel.classList.add('hidden');
        perfBar.classList.add('hidden-element');
        scoreContainer.classList.add('hidden-element');
=======
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
>>>>>>> cb3a6e45c1bb47caedf9f19cd9293113bef61efe
    }
    updateCard();
}

< HEAD
function handleMatchdayTypeChange() {
    const type = document.getElementById('mdSelector').value;
    const blockA = document.getElementById('blockMD_A');
    const blockB = document.getElementById('blockMD_B');

function adjustImage() {
    const zoom = document.getElementById('zoomInput').value;
    const posX = document.getElementById('posXInput').value;
    const posY = document.getElementById('posYInput').value;
    const imgElement = document.getElementById('playerImage');
 cb3a6e45c1bb47caedf9f19cd9293113bef61efe
    
    if (type === "MD9") {
        blockA.classList.add('hidden');
        blockB.classList.add('hidden');
    } else {
        blockA.classList.remove('hidden');
        blockB.classList.remove('hidden');
    }
    updateCard();
}

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
<<<<<<< HEAD
        document.getElementById('playerImage').src = event.target.result;
=======
        const imgElement = document.getElementById('playerImage');
        imgElement.src = event.target.result;
        imgElement.onload = function() {
            adjustImage();
        };
    }
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
>>>>>>> cb3a6e45c1bb47caedf9f19cd9293113bef61efe
    }
    reader.readAsDataURL(e.target.files[0]);
}

<<<<<<< HEAD
function adjustImage() {
    const zoom = document.getElementById('zoomInput').value;
    const x = document.getElementById('posXInput').value;
    const y = document.getElementById('posYInput').value;
    const img = document.getElementById('playerImage');
    img.style.transform = `scale(${zoom}) translate(${x}px, ${y}px)`;
=======
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
>>>>>>> cb3a6e45c1bb47caedf9f19cd9293113bef61efe
}

function downloadCard() {
    html2canvas(document.getElementById('card'), { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'champion-card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
<<<<<<< HEAD
=======

window.onload = function() {
    updateCard();
};
                                                 
>>>>>>> cb3a6e45c1bb47caedf9f19cd9293113bef61efe
