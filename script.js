function getDreadScores() {
    const asset = document.getElementById("asset").value;
    const stride = document.getElementById("stride").value;
    const damage = parseInt(document.getElementById("damage").value) || 0;
    const reproducibility = parseInt(document.getElementById("reproducibility").value) || 0;
    const exploitability = parseInt(document.getElementById("exploitability").value) || 0;
    const affectedUsers = parseInt(document.getElementById("affected-users").value) || 0;
    const discoverability = parseInt(document.getElementById("discoverability").value) || 0;

    if (!asset || !stride || damage === 0 || reproducibility === 0 || exploitability === 0 || affectedUsers === 0 || discoverability === 0) {
        alert("Silakan lengkapi semua field untuk melihat hasil grafik.");
        return null;
    }

    const dreadScore = (damage + reproducibility + exploitability + affectedUsers + discoverability) / 5;
    return { dreadScore, damage, reproducibility, exploitability, affectedUsers, discoverability, asset, stride };
}

function generateChart() {
    const dreadScores = getDreadScores();
    if (!dreadScores) return;

    const { damage, reproducibility, exploitability, affectedUsers, discoverability, dreadScore, stride } = dreadScores;

    const ctx = document.getElementById("chart").getContext("2d");
    document.getElementById("chart-container").style.display = "block";
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Damage", "Reproducibility", "Exploitability", "Affected Users", "Discoverability"],
            datasets: [{
                label: "DREAD Score",
                data: [damage, reproducibility, exploitability, affectedUsers, discoverability],
                backgroundColor: "rgba(90, 103, 216, 0.5)",
                borderColor: "rgba(90, 103, 216, 1)",
                pointBackgroundColor: "rgba(90, 103, 216, 1)",
                pointBorderColor: "#fff",
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        color: "rgba(108, 117, 125, 0.2)"
                    },
                    angleLines: {
                        color: "rgba(108, 117, 125, 0.2)"
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });

    document.getElementById("risk-description").style.display = "block";
    document.getElementById("threat-description").innerText = `Ancaman "${stride}" yang dipilih berkaitan dengan risiko yang spesifik terhadap ${dreadScores.asset}, memiliki potensi ancaman signifikan bergantung pada skor DREAD.`;
    
    let riskLevel;
    if (dreadScore >= 7) {
        riskLevel = "Tinggi";
    } else if (dreadScore >= 4) {
        riskLevel = "Sedang";
    } else {
        riskLevel = "Rendah";
    }
    document.getElementById("risk-level").innerText = `Tingkat Risiko: ${riskLevel} (Skor DREAD rata-rata: ${dreadScore.toFixed(2)})`;
}
