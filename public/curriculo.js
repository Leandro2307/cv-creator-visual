// Estado global
let resumeData = {
    personalInfo: {},
    education: [],
    experience: [],
    courses: [],
    skills: [],
    observations: '',
    photoURL: null
};

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Atualizar botões
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Atualizar painéis
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});

// Calcular idade automaticamente
document.getElementById('birthDate').addEventListener('change', (e) => {
    const birthDate = new Date(e.target.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    document.getElementById('age').value = age;
    updatePreview();
});

// Upload de foto
document.getElementById('photo').addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        // Verificar tamanho (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('A foto deve ter no máximo 5MB', 'error');
            e.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            resumeData.photoURL = event.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
});

// Atualizar preview em tempo real
document.getElementById('resumeForm').addEventListener('input', updatePreview);

function updatePreview() {
    // Dados pessoais
    const name = document.getElementById('name').value;
    const birthDate = document.getElementById('birthDate').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    
    document.getElementById('preview-name').textContent = name || 'SEU NOME COMPLETO';
    document.getElementById('preview-birthDate').textContent = birthDate ? formatDate(birthDate) : '__/__/____';
    document.getElementById('preview-age').textContent = age || '__';
    document.getElementById('preview-address').textContent = address || 'Seu endereço completo';
    document.getElementById('preview-phone').textContent = phone || '(00) 00000-0000';
    document.getElementById('preview-email').textContent = email || 'seu@email.com';
    
    if (additionalInfo) {
        document.getElementById('preview-additionalInfo').textContent = additionalInfo;
        document.getElementById('preview-additionalInfo-container').style.display = 'block';
    } else {
        document.getElementById('preview-additionalInfo-container').style.display = 'none';
    }
    
    // Foto
    const photoDiv = document.getElementById('preview-photo');
    if (resumeData.photoURL) {
        photoDiv.innerHTML = `<img src="${resumeData.photoURL}" alt="Foto">`;
    } else {
        photoDiv.className = 'photo-placeholder';
        photoDiv.textContent = 'Foto 3x4';
    }
    
    // Formação
    updateEducationPreview();
    
    // Experiência
    updateExperiencePreview();
    
    // Cursos
    updateCoursesPreview();
    
    // Habilidades
    updateSkillsPreview();
    
    // Observações
    const observations = document.getElementById('observations').value;
    if (observations) {
        document.getElementById('preview-observations').textContent = observations;
        document.getElementById('preview-observations-section').style.display = 'block';
    } else {
        document.getElementById('preview-observations-section').style.display = 'none';
    }
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// FORMAÇÃO ACADÊMICA
let educationCount = 0;

function addEducation() {
    educationCount++;
    const id = `education-${educationCount}`;
    
    const html = `
        <div class="item-container" id="${id}">
            <div class="item-header">
                <h3>Formação ${educationCount}</h3>
                <button type="button" class="btn-danger" onclick="removeItem('${id}')">Remover</button>
            </div>
            <div class="form-group">
                <label>Curso</label>
                <input type="text" data-type="education" data-field="course" onchange="updatePreview()">
            </div>
            <div class="form-group">
                <label>Instituição</label>
                <input type="text" data-type="education" data-field="institution" onchange="updatePreview()">
            </div>
            <div class="form-group">
                <label>Período</label>
                <input type="text" placeholder="Ex: 2018 - 2022" data-type="education" data-field="period" onchange="updatePreview()">
            </div>
        </div>
    `;
    
    document.getElementById('educationList').insertAdjacentHTML('beforeend', html);
    updatePreview();
}

function updateEducationPreview() {
    const items = document.querySelectorAll('[data-type="education"]');
    const education = [];
    
    for (let i = 0; i < items.length; i += 3) {
        const course = items[i].value;
        const institution = items[i + 1].value;
        const period = items[i + 2].value;
        
        if (course || institution || period) {
            education.push({ course, institution, period });
        }
    }
    
    const previewDiv = document.getElementById('preview-education');
    const sectionDiv = document.getElementById('preview-education-section');
    
    if (education.length > 0) {
        previewDiv.innerHTML = education.map(edu => `
            <div class="education-item">
                ${edu.course ? `<p><strong>${edu.course}</strong>${edu.institution ? ` - ${edu.institution}` : ''}${edu.period ? ` (${edu.period})` : ''}</p>` : ''}
            </div>
        `).join('');
        sectionDiv.style.display = 'block';
    } else {
        sectionDiv.style.display = 'none';
    }
}

// EXPERIÊNCIA PROFISSIONAL
let experienceCount = 0;

function addExperience() {
    experienceCount++;
    const id = `experience-${experienceCount}`;
    
    const html = `
        <div class="item-container" id="${id}">
            <div class="item-header">
                <h3>Experiência ${experienceCount}</h3>
                <button type="button" class="btn-danger" onclick="removeItem('${id}')">Remover</button>
            </div>
            <div class="form-group">
                <label>Empresa</label>
                <input type="text" data-type="experience" data-field="company" onchange="updatePreview()">
            </div>
            <div class="form-group">
                <label>Cargo</label>
                <input type="text" data-type="experience" data-field="position" onchange="updatePreview()">
            </div>
            <div class="form-group">
                <label>Período</label>
                <input type="text" placeholder="Ex: Jan/2020 - Dez/2023" data-type="experience" data-field="period" onchange="updatePreview()">
            </div>
        </div>
    `;
    
    document.getElementById('experienceList').insertAdjacentHTML('beforeend', html);
    updatePreview();
}

function updateExperiencePreview() {
    const items = document.querySelectorAll('[data-type="experience"]');
    const experience = [];
    
    for (let i = 0; i < items.length; i += 3) {
        const company = items[i].value;
        const position = items[i + 1].value;
        const period = items[i + 2].value;
        
        if (company || position || period) {
            experience.push({ company, position, period });
        }
    }
    
    const previewDiv = document.getElementById('preview-experience');
    const sectionDiv = document.getElementById('preview-experience-section');
    
    if (experience.length > 0) {
        previewDiv.innerHTML = experience.map(exp => `
            <div class="experience-item">
                ${exp.company ? `<p><strong>Empresa:</strong> ${exp.company}</p>` : ''}
                ${exp.position ? `<p><strong>Cargo:</strong> ${exp.position}</p>` : ''}
                ${exp.period ? `<p><strong>Período:</strong> ${exp.period}</p>` : ''}
            </div>
        `).join('');
        sectionDiv.style.display = 'block';
    } else {
        sectionDiv.style.display = 'none';
    }
}

// CURSOS
let coursesCount = 0;

function addCourse() {
    coursesCount++;
    const id = `course-${coursesCount}`;
    
    const html = `
        <div class="item-container" id="${id}">
            <div class="item-header">
                <h3>Curso ${coursesCount}</h3>
                <button type="button" class="btn-danger" onclick="removeItem('${id}')">Remover</button>
            </div>
            <div class="form-group">
                <label>Nome do Curso</label>
                <input type="text" data-type="course" data-field="name" onchange="updatePreview()">
            </div>
            <div class="form-group">
                <label>Instituição</label>
                <input type="text" data-type="course" data-field="institution" onchange="updatePreview()">
            </div>
            <div class="form-group">
                <label>Ano</label>
                <input type="text" placeholder="Ex: 2023" data-type="course" data-field="year" onchange="updatePreview()">
            </div>
        </div>
    `;
    
    document.getElementById('coursesList').insertAdjacentHTML('beforeend', html);
    updatePreview();
}

function updateCoursesPreview() {
    const items = document.querySelectorAll('[data-type="course"]');
    const courses = [];
    
    for (let i = 0; i < items.length; i += 3) {
        const name = items[i].value;
        const institution = items[i + 1].value;
        const year = items[i + 2].value;
        
        if (name || institution || year) {
            courses.push({ name, institution, year });
        }
    }
    
    const previewDiv = document.getElementById('preview-courses');
    const sectionDiv = document.getElementById('preview-courses-section');
    
    if (courses.length > 0) {
        previewDiv.innerHTML = courses.map(course => `
            <div class="course-item">
                ${course.name ? `<p><strong>${course.name}</strong>${course.institution ? ` - ${course.institution}` : ''}${course.year ? ` (${course.year})` : ''}</p>` : ''}
            </div>
        `).join('');
        sectionDiv.style.display = 'block';
    } else {
        sectionDiv.style.display = 'none';
    }
}

// HABILIDADES
let skillsCount = 0;

function addSkill() {
    skillsCount++;
    const id = `skill-${skillsCount}`;
    
    const html = `
        <div class="item-container" id="${id}">
            <div class="item-header">
                <h3>Habilidade ${skillsCount}</h3>
                <button type="button" class="btn-danger" onclick="removeItem('${id}')">Remover</button>
            </div>
            <div class="form-group">
                <input type="text" data-type="skill" placeholder="Ex: Conhecimento em Excel avançado" onchange="updatePreview()">
            </div>
        </div>
    `;
    
    document.getElementById('skillsList').insertAdjacentHTML('beforeend', html);
    updatePreview();
}

function updateSkillsPreview() {
    const items = document.querySelectorAll('[data-type="skill"]');
    const skills = Array.from(items).map(item => item.value).filter(s => s.trim());
    
    const previewUl = document.getElementById('preview-skills');
    const sectionDiv = document.getElementById('preview-skills-section');
    
    if (skills.length > 0) {
        previewUl.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
        sectionDiv.style.display = 'block';
    } else {
        sectionDiv.style.display = 'none';
    }
}

// REMOVER ITEM
function removeItem(id) {
    document.getElementById(id).remove();
    updatePreview();
}

// GERAR PDF
document.getElementById('btnDownloadPDF').addEventListener('click', async () => {
    const name = document.getElementById('name').value || 'curriculo';
    
    showToast('Gerando PDF...', 'info');
    
    try {
        const element = document.getElementById('resume-preview');
        
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`curriculo-${name}.pdf`);
        
        showToast('PDF gerado com sucesso!', 'success');
    } catch (error) {
        console.error(error);
        showToast('Erro ao gerar PDF. Tente novamente.', 'error');
    }
});

// TOAST
function showToast(message, type = 'info') {
    // Remover toast anterior
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    if (type !== 'info') {
        setTimeout(() => {
            toast.remove();
        }, 3000);
    } else {
        // Toast de loading fica até ser removido manualmente
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.remove();
            }
        }, 10000);
    }
}

// Inicializar com um item de cada
addEducation();
addExperience();
addCourse();
addSkill();