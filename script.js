// Active state navigation memory variables
let activeSection = 'home';

function switchSection(sectionId) {
    activeSection = sectionId;
    
    // UI Tab toggle highlight swap
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Toggle the performance stats row panel visibility inside input panel
    const perfPanel = document.getElementById('tournamentPerformanceInputs');
    const liveStatsRow = document.getElementById('cardPerfStats');
    const watermarkElement = document.getElementById('cardWatermark');
    
    if (sectionId === 'home') {
        perfPanel.classList.remove('visible');
        liveStatsRow.classList.remove('visible');
        watermarkElement.innerText = "";
    } else {
        perfPanel.classList.add('visible');
        liveStatsRow.classList.add('visible');
        
        // Dynamic watermarking config strings
        if(sectionId === 'elite-division') watermarkElement.innerText = "S7 LIVE";
        if(sectionId === 'elite-league') watermarkElement.innerText = "ELITE";
        if(sectionId === 'pes-camp') watermarkElement.innerText = "CAMP";
        if(sectionId === 'ultimate-player') watermarkElement.innerText = "KNOCKOUT";
    }
    
    updateCard();
}

function updateCard() {
    const name = document.getElementById("nameInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;
    const cardStyle = document.getElementById("cardStyleInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);
    
    // Extract tournament stat numbers
    const condition = document.getElementById("formInput") ? document.getElementById("formInput").value : "";
    const gs = document.getElementById("gsInput") ? document.getElementById("gsInput").value : "0";
    const as = document.getElementById("asInput") ? document.getElementById("asInput").value : "0";
    const cs = document.getElementById("csInput") ? document.getElementById("csInput").value : "0";
    const amr = document.getElementById("amrInput") ? document.getElementById("amrInput").value : "0.0";

    // Absolute positioning slider parsing values
    const size = document.getElementById("sizeSlider").value;
    const shiftX = document.getElementById("xSlider").value;
    const shiftY = document.getElementById("ySlider").value;

    // Interface Text Synchronizations
    document.getElementById("cardName").innerText = name || "BINAYA SHRESTHA";
    document.getElementById("cardRating").innerText = rating || "105";
    document.getElementById("cardYear").innerText = year || "2026/27";
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);
    
    // Stats strings sync
    document.getElementById("cardGS").innerText = gs || "0";
    document.getElementById("cardAS").innerText = as || "0";
    document.getElementById("cardCS").innerText = cs || "0";
    document.getElementById("cardAMR").innerText = amr || "0.0";

    // Synchronize current active class mapping onto design target box container
    const cardElement = document.getElementById("card");
    if (activeSection === 'home') {
        cardElement.className = "card home " + cardStyle;
    } else {
        cardElement.className = "card " + activeSection;
    }

    // Dynamic Condition Stamp management
    const stamp = document.getElementById("cardFormStamp");
    stamp.className = "form-badge"; 
    if (activeSection !== 'home' && condition !== "") {
        if (condition === 'POTW') { stamp.innerText = "🌟 POTW"; stamp.classList.add('potw'); }
        if (condition === 'FORM-A') { stamp.innerText = "FORM A"; stamp.classList.add('form-a'); }
        if (condition === 'FORM-B') { stamp.innerText = "FORM B"; stamp.classList.add('form-b'); }
    }

    // Sharp Layout Position Engine mutation rules
    const imgElement = document.getElementById("cardPlayerImg");
    if (imgElement.style.display === "block") {
        imgElement.style.width = size + "px";
        imgElement.style.left = "50%";
        imgElement.style.marginLeft = (parseInt(shiftX) - (parseInt(size) / 2)) + "px";
        imgElement.style.top = shiftY + "px";
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const tempImg = new Image();
        tempImg.onload = function() {
            // Absolute max memory constraint boundary line protecting mobile VRAM allocations
            const maxBound = 1000;
            let targetW = tempImg.width;
            let targetH = tempImg.height;

            if (targetW > maxBound || targetH > maxBound) {
                if (targetW > targetH) {
                    targetH *= maxBound / targetW;
                    targetW = maxBound;
                } else {
                    targetW *= maxBound / targetH;
                    targetH = maxBound;
                }
            }

            // Draw clean processed buffer canvas configuration
            const bufferCanvas = document.createElement('canvas');
            bufferCanvas.width = targetW;
            bufferCanvas.height = targetH;
            const context = bufferCanvas.getContext('2d');
            
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            context.drawImage(tempImg, 0, 0, targetW, targetH);

            const imgElement = document.getElementById('cardPlayerImg');
            imgElement.src = bufferCanvas.toDataURL('image/png', 1.0);
            imgElement.style.display = "block";
            
            updateCard();
        };
        tempImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Scale 3 setup delivers professional sharp image profiles without risking system exceptions
    html2canvas(cardElement, {
        scale: 3, 
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    }).then(canvas => {
        let downloadLink = document.createElement("a");
        downloadLink.download = activeSection + "-hd-card.png";
        downloadLink.href = canvas.toDataURL("image/png", 1.0);
        downloadLink.click();
    });
}
