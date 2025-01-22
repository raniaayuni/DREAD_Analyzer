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

    let riskLevel, threatDetails, solutions;
    if (dreadScore >= 9) {
        riskLevel = "Sangat Tinggi";
        threatDetails = "Ancaman ini memiliki dampak yang sangat serius terhadap sistem dan pengguna.";
        solutions = "Segera lakukan mitigasi dengan memperkuat enkripsi, memperbarui sistem, dan melakukan audit keamanan menyeluruh.";
    } else if (dreadScore >= 7) {
        riskLevel = "Tinggi";
        threatDetails = "Ancaman ini dapat menyebabkan kerusakan signifikan dan mengganggu operasional.";
        solutions = "Lakukan evaluasi sistem keamanan dan implementasikan firewall serta monitoring secara aktif.";
    } else if (dreadScore >= 4) {
        riskLevel = "Sedang";
        threatDetails = "Ancaman ini memiliki dampak yang dapat ditangani, tetapi perlu diawasi.";
        solutions = "Pantau sistem secara berkala dan lakukan update keamanan.";
    } else {
        riskLevel = "Rendah";
        threatDetails = "Ancaman ini memiliki dampak kecil dan risiko kerusakan minimal.";
        solutions = "Pastikan standar keamanan tetap dipenuhi dan lakukan pengawasan rutin.";
    }

    document.getElementById("risk-level").innerText = `Tingkat Risiko: ${riskLevel} (Skor DREAD rata-rata: ${dreadScore.toFixed(2)})`;
    document.getElementById("dread-solutions").style.display = "block";
    document.getElementById("dread-threat-details").innerText = threatDetails;
    document.getElementById("dread-solutions-text").innerText = solutions;
}
