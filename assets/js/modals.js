// PROJECT DATA
    const projects = {
        autotrack: { title: 'AutoTrack: Vehicle Detection & Tracking', desc: 'Published in IEEE (TENSYMP 2025, Doc: 11144993). A deep learning approach on a novel dataset for vehicle detection and route tracking from CCTV images. Introduces a robust CNN-based pipeline for real-time traffic monitoring.', image: 'https://images.unsplash.com/photo-1542614471-001ccf2b449c?q=80&w=2070&auto=format&fit=crop', link: 'https://ieeexplore.ieee.org/document/11144993', tags: ['Deep Learning', 'IEEE', 'Computer Vision', 'Python', 'YOLO'] },
        phylab: { title: 'PhysiSenseVLR: PhyLabLens', desc: 'Under review at IMAVIS. A multimodal vision-language model system for physics laboratory instrument comprehension. Leverages advanced VLMs to identify, classify, and explain physics lab instruments for interactive educational experiences.', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop', link: 'https://github.com/musfiqurR661/PhyLabLens_ML_DIP', tags: ['Vision Language Models', 'Multimodal AI', 'Education', 'Transformers'] },
        dengue: { title: 'Interpretable ML for Dengue Diagnosis', desc: 'Under review at BSPC. An interpretable machine learning approach for dengue diagnosis based on blood test patterns. Focuses on explainable AI (XAI) techniques to assist medical practitioners with transparent model decisions.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop', link: '#', tags: ['Machine Learning', 'XAI', 'Healthcare', 'SHAP', 'LIME'] },
        defectomcu: { title: 'DefectoMCU Framework', desc: 'In development. An automated vision-based framework for physical defect detection in microcontroller boards using deep learning. Aims to replace manual PCB inspection with a high-precision automated optical inspection (AOI) pipeline.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', link: 'https://defectomcu-frontend.vercel.app/', tags: ['Computer Vision', 'Deep Learning', 'AOI', 'Automation', 'Manufacturing'] },
        uiutools: { title: 'UIU Student Tools', desc: 'A comprehensive web platform for United International University students. Features academic planning calculators, tuition fee estimation, and study tools used by many UIU students.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop', link: 'https://uiu-cgpa-calculator.web.app/home', tags: ['Web Development', 'Firebase', 'JavaScript', 'EdTech'] },
        germanvpd: { title: 'German-VPD', desc: 'Live development project hosted on Vercel with a modern product-style web experience.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', link: 'https://german-vpd-n.vercel.app/', tags: ['Vercel', 'Live', 'Web App', 'Development'] },
        execode: { title: 'ExeCode Platform', desc: 'A specialized competitive programming environment with in-browser compiler, curated problem sets categorized by difficulty, a live leaderboard, and editorial support to help students practice algorithms effectively.', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop', link: '#', tags: ['Web Dev', 'Competitive Programming', 'Algorithms', 'Education'] }
    };

    // MODALS
    function openProfileModal() { const m = document.getElementById('profile-modal'); const b = document.getElementById('profile-modal-box'); m.classList.add('open'); setTimeout(() => b.classList.add('open'), 10); }
    function closeProfileModal() { const m = document.getElementById('profile-modal'); const b = document.getElementById('profile-modal-box'); b.classList.remove('open'); setTimeout(() => m.classList.remove('open'), 350); }
    function openProjModal(id) { const d = projects[id]; if (!d) return; document.getElementById('pm-title').textContent = d.title; document.getElementById('pm-desc').textContent = d.desc; document.getElementById('pm-image').src = d.image; document.getElementById('pm-link').href = d.link; const tags = document.getElementById('pm-tags'); tags.innerHTML = d.tags.map(t => `<span class="tag">${t}</span>`).join(''); const m = document.getElementById('proj-modal'); const b = document.getElementById('proj-modal-box'); m.classList.add('open'); setTimeout(() => b.classList.add('open'), 10); }
    function closeProjModal() { const m = document.getElementById('proj-modal'); const b = document.getElementById('proj-modal-box'); b.classList.remove('open'); setTimeout(() => m.classList.remove('open'), 350); }
    function openCvModal() { const m = document.getElementById('cv-modal'); const b = document.getElementById('cv-modal-box'); m.classList.add('open'); setTimeout(() => b.classList.add('open'), 10); }
    function closeCvModal() { const m = document.getElementById('cv-modal'); const b = document.getElementById('cv-modal-box'); b.classList.remove('open'); setTimeout(() => m.classList.remove('open'), 350); }
    function goToCvMail() { window.location.href = 'mailto:musfiqurm661@gmail.com?subject=CV%20Request%20-%20Md%20Musfiqur%20Rahman'; }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeProfileModal(); closeProjModal(); closeCvModal(); } });

    // PROJECT FILTER
    function filterProjects(category, btn) { document.querySelectorAll('.active-filter').forEach(b => { b.classList.remove('active-filter'); b.style.borderColor = ''; b.style.color = ''; }); btn.classList.add('active-filter'); btn.style.borderColor = 'rgba(124,58,237,0.5)'; btn.style.color = 'white'; document.querySelectorAll('#projects-grid .proj-card').forEach(card => { const match = category === 'all' || card.dataset.category === category; card.style.opacity = match ? '1' : '0.2'; card.style.transform = match ? '' : 'scale(0.95)'; }); }

function buildPrintableResumeHtml() {
        const source = document.getElementById('resume-print');
        if (!source) return '';
        const siteUrl = 'https://musfiqurr661.github.io/Md-Musfiqur-Rahman/';
        const siteLabel = 'https://musfiqurr661.github.io/Md-Musfiqur-Rahman/';

        const clone = source.cloneNode(true);
        const headline = clone.querySelector('.resume-headline');
        if (headline) {
            const chipRow = headline.querySelector('.mt-4');
            if (chipRow) chipRow.remove();

            const contactLine = document.createElement('div');
            contactLine.className = 'pdf-contact-line';
            contactLine.innerHTML = `
                <span class="item"><span class="icon">✉</span><a href="mailto:musfiqurm661@gmail.com">musfiqurm661@gmail.com</a></span>
                <span class="sep">|</span>
                <span class="item"><span class="icon">☎</span><span>+880 1744-106266</span></span>
                <span class="sep">|</span>
                <span class="item"><span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.9 8.6H3.4V20h3.5V8.6ZM5.1 7.1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm15.5 6.1c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3 1.7v-1.5h-3.4V20h3.5v-5.7c0-1.5.3-3 2.1-3s2 1.7 2 3.1V20H21v-6.8Z"/></svg></span><a href="https://linkedin.com/in/musfiqur661">linkedin.com/in/musfiqur661</a></span>
                <span class="sep">|</span>
                <span class="item"><span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.4.8-4.1-1.4-4.1-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.7-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 6.6 8c-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2a4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg></span><a href="https://github.com/musfiqurR661">github.com/musfiqurR661</a></span>
                <span class="sep">|</span>
                <span class="item"><span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm7.8 9h-3.1a15.6 15.6 0 0 0-1.1-5A8 8 0 0 1 19.8 11ZM12 4.1c.9 1.2 1.8 3.3 2.2 6H9.8c.4-2.7 1.3-4.8 2.2-6ZM8.4 6a15.6 15.6 0 0 0-1.1 5H4.2A8 8 0 0 1 8.4 6ZM4.2 13h3.1a15.6 15.6 0 0 0 1.1 5A8 8 0 0 1 4.2 13Zm5.6 0h4.4c-.4 2.7-1.3 4.8-2.2 6-.9-1.2-1.8-3.3-2.2-6Zm5.8 5a15.6 15.6 0 0 0 1.1-5h3.1a8 8 0 0 1-4.2 5Z"/></svg></span><a href="${siteUrl}">${siteLabel}</a></span>
            `;

            const titleEl = headline.querySelector('h3');
            if (titleEl) {
                titleEl.insertAdjacentElement('afterend', contactLine);
            } else {
                headline.appendChild(contactLine);
            }
        }

        return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Md Musfiqur Rahman - Resume</title>
    <style>
        @import url('https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css');

        @page { size: A4; margin: 0; }
        html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #111111;
            font-family: 'Computer Modern Serif', 'CMU Serif', 'Latin Modern Roman', serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        body { padding: 0; }
        .page {
            max-width: 760px;
            margin: 0 auto;
            padding: 8mm 10mm 10mm;
        }
        .pdf-contact-line {
            background: #ffffff;
            color: #111111;
            padding: 6px 0 3px;
            font-size: 11.5px;
            line-height: 1.25;
            margin: 6px 0 0;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
        }
        .pdf-contact-line .item {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            color: #111111;
            white-space: nowrap;
        }
        .pdf-contact-line .icon {
            width: 14px;
            height: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #111111;
            font-size: 10px;
            font-weight: 700;
            line-height: 1;
            transform: translateY(1px);
        }
        .pdf-contact-line .icon svg {
            width: 13px;
            height: 13px;
            display: block;
            fill: #111111;
        }
        .pdf-contact-line a,
        .pdf-contact-line a:visited {
            color: #2f63b7;
            text-decoration: none;
            border-bottom: 1px solid rgba(47,99,183,0.35);
            padding-bottom: 0;
        }
        .pdf-contact-line .sep {
            opacity: 0.8;
            color: #71717a;
        }
        #resume-print,
        #resume-print * {
            box-sizing: border-box;
            font-family: 'Computer Modern Serif', 'CMU Serif', 'Latin Modern Roman', serif;
            color: #111111;
            background: transparent;
            box-shadow: none;
            text-shadow: none;
        }
        #resume-print {
            width: 100%;
            padding: 0;
            margin: 0;
        }
        #resume-print h3 {
            margin: 0;
            font-size: 26px;
            line-height: 1.1;
            font-weight: 700;
        }
        #resume-print h4 {
            margin: 0 0 6px;
            font-size: 16px;
            line-height: 1.2;
            font-weight: 700;
        }
        #resume-print p,
        #resume-print li {
            margin: 0;
            font-size: 12px;
            line-height: 1.45;
        }
        #resume-print section {
            margin-top: 14px;
            break-inside: avoid;
            page-break-inside: avoid;
        }
        #resume-print .resume-panel {
            border: 0;
            border-radius: 0;
        }
        #resume-print .resume-headline {
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #111111;
        }
        #resume-print .resume-rule {
            height: 1px;
            background: #111111;
            margin: 8px 0 10px;
        }
        #resume-print .resume-chip {
            display: inline-block;
            border: 1px solid #111111;
            border-radius: 999px;
            padding: 3px 8px;
            margin: 4px 6px 0 0;
            font-size: 11px;
            white-space: nowrap;
        }
        #resume-print .resume-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11.5px;
        }
        #resume-print .resume-table th,
        #resume-print .resume-table td {
            border: 1px solid #111111;
            padding: 7px 8px;
            vertical-align: top;
            text-align: left;
        }
        #resume-print .resume-table th {
            background: #f5f5f5;
            font-weight: 700;
        }
        #resume-print ul {
            margin: 0;
            padding-left: 18px;
        }
        #resume-print li {
            margin-bottom: 2px;
        }
        #resume-print a,
        #resume-print a:visited {
            color: #111111;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <main class="page">
        ${clone.outerHTML}
    </main>
    <script>
        window.addEventListener('load', () => {
            window.focus();
            setTimeout(() => window.print(), 250);
        });
        window.addEventListener('afterprint', () => setTimeout(() => window.close(), 120));
    <\/script>
</body>
</html>`;
    }

    function downloadResumePDF() {
        const printHtml = buildPrintableResumeHtml();
        if (!printHtml) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow popups for resume PDF download.');
            return;
        }

        printWindow.document.open();
        printWindow.document.write(printHtml);
        printWindow.document.close();
    }

    function requestCVByEmail(event) {
        if (event) event.preventDefault();
        openCvModal();
    }
