// Feature toggling functionality
let activeFeature = null;
let isVerified = false;  // Add at the top with other state variables

function toggleFeature(featureName) {
    const features = {
        'materials': document.getElementById('materialsSection'),
        'gpa': document.getElementById('gpaSection'),
        'summary': document.getElementById('summarySection')
    };
    
    // If clicking the same feature that's already open, close it with animation
    if (activeFeature === featureName) {
        const feature = features[featureName];
        feature.classList.add('closing');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            feature.style.display = 'none';
            feature.classList.remove('closing');
            document.querySelector('.container').classList.remove('password-verified');
            
            // Reset content based on feature type
            if (featureName === 'materials') {
                document.getElementById('semesterSelect').value = '';
                document.getElementById('courseSearch').value = '';
                document.getElementById('resultsContainer').style.display = 'none';
                document.getElementById('coursesContainer').innerHTML = '';
                currentSemester = null;
                isVerified = false;
            } else if (featureName === 'gpa') {
                document.getElementById('gpaSemester').value = '';
                document.getElementById('gpaCourseList').innerHTML = '';
                document.getElementById('gpaResult').textContent = '';
            }
            
            activeFeature = null;
        }, 400); // Match transition duration
        return;
    }
    
    // Hide all features first
    Object.values(features).forEach(feature => {
        if (feature) feature.style.display = 'none';
    });

    // Show selected feature
    if (features[featureName]) {
        features[featureName].style.display = 'block';
        
        // Apply shifted layout for both materials and GPA sections on desktop
        if (window.innerWidth >= 1024 && (featureName === 'materials' || featureName === 'gpa')) {
            document.querySelector('.container').classList.add('password-verified');
        }
        
        if (featureName === 'gpa') {
            document.getElementById('gpaCalculator').style.display = 'block';
        } else if (featureName === 'summary') {
            showMaterialsSummary();
        }
    }

    activeFeature = featureName;
}

// Passwords and course data
const passwords = {
'100-1': '11',
'100-2': '12',
'200-1': '21',
'200-2': '22',
'300-1': '31',
'300-2': '32'
};

// Courses code, name, type[Compulsory or Elective], Materials

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/KASCOIN/MET-LIBRARY/main/';
const courseData = {
    '100-1': [
        {
            code: 'GST 111',
            name: 'Nigerian Peoples and Culture',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Note 1', fileLink: `https://raw.githubusercontent.com/KASCOIN/MET-LIBRARY/main/Materials/100-1/GST111/LOVE.docx`},
                { name: 'Lecture Note 2', fileLink: `https://raw.githubusercontent.com/KASCOIN/MET-LIBRARY/main/Materials/100-1/GST111/lecture.pdf`},
                { name: 'Lecture Note 3', fileLink: `https://raw.githubusercontent.com/KASCOIN/MET-LIBRARY/main/Materials/100-1/GST111/lecture.pdf`}
            ]
        },
        {
            code: 'MTH 101',
            name: 'Elementary Mathematics I',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/100-1/MTH101_1.pdf' },
                { name: 'Past Questions', fileLink: 'workspace/100-1/MTH101_PQ.pdf' }
            ]
        },
        {
            code: 'BIO 101',
            name: 'General Biology I',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/100-1/BIO101_1.pdf' },
                { name: 'Lab Manual', fileLink: 'workspace/100-1/BIO101_lab.pdf' }
            ]
        },
        {
            code: 'BIO 107',
            name: 'General Biology Practical I',
            type: 'Compulsory',
            materials: [
                { name: 'Practical Guide', fileLink: 'workspace/100-1/BIO107_guide.pdf' },
                { name: 'Lab Report Template', fileLink: 'workspace/100-1/BIO107_template.pdf' }
            ]
        },
        {
            code: 'CHM 101',
            name: 'General Chemistry I',
            type: 'Elective',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/100-1/CHM101_notes.pdf' },
                { name: 'Practice Problems', fileLink: 'workspace/100-1/CHM101_problems.pdf' }
            ]
        },
        {
            code: 'CHM 107',
            name: 'General Chemistry Practical I',
            type: 'Compulsory',
            materials: [
                { name: 'Lab Manual', fileLink: 'workspace/100-1/CHM107_manual.pdf' },
                { name: 'Safety Guidelines', fileLink: 'workspace/100-1/CHM107_safety.pdf' }
            ]
        },
        {
            code: 'MET 101',
            name: 'Introduction to Meteorology',
            type: 'Compulsory',
            materials: [
                { name: 'Course Notes', fileLink: 'workspace/100-1/MET101_notes.pdf' },
                { name: 'Study Guide', fileLink: 'workspace/100-1/MET101_guide.pdf' }
            ]
        },
        {
            code: 'PHY 101',
            name: 'General Physics I',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Materials', fileLink: 'workspace/100-1/PHY101_lecture.pdf' },
                { name: 'Problem Set', fileLink: 'workspace/100-1/PHY101_problems.pdf' }
            ]
        },
        {
            code: 'PHY 107',
            name: 'General Physics Practical I',
            type: 'Elective',
            materials: [
                { name: 'Lab Guide', fileLink: 'workspace/100-1/PHY107_guide.pdf' },
                { name: 'Data Sheets', fileLink: 'workspace/100-1/PHY107_data.pdf' }
            ]
        },
        {
            code: 'LAG-MET 131',
            name: 'Introduction to Climate Science and Development',
            type: 'Compulsory',
            materials: [
                { name: 'Study Material', fileLink: 'workspace/100-1/LAGMET131_study.pdf' },
                { name: 'Reference Guide', fileLink: 'workspace/100-1/LAGMET131_ref.pdf' }
            ]
        },
        {
            code: 'LAG-MET 133',
            name: 'Climate and the terrestrial environments',
            type: 'Compulsory',
            materials: [
                { name: 'Course Notes', fileLink: 'workspace/100-1/LAGMET133_notes.pdf' },
                { name: 'Case Studies', fileLink: 'workspace/100-1/LAGMET133_cases.pdf' }
            ]
        },
        {
            code: 'GEO 109',
            name: 'Introduction to Hydrology',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/100-1/GEO109_notes.pdf' },
                { name: 'Field Guide', fileLink: 'workspace/100-1/GEO109_field.pdf' }
            ]
        },
        {
            code: 'GEO 105',
            name: 'Introduction to Environmental Science',
            type: 'Elective',
            materials: [
                { name: 'Study Material', fileLink: 'workspace/100-1/GEO105_study.pdf' },
                { name: 'Project Guide', fileLink: 'workspace/100-1/GEO105_project.pdf' }
            ]
        },
        {
            code: 'COS 101',
            name: 'Introduction to Computing Science',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/100-1/COS101_material.pdf' },
                { name: 'Practice Exercises', fileLink: '/' }
            ]
        }
    ],
    '100-2': [
        {
            code: 'MET 121',
            name: 'Man and Environment',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/100-2/MET121_notes.pdf' },
                { name: 'Study Guide', fileLink: 'workspace/100-2/MET121_guide.pdf' }
            ]
        },
        {
            code: 'MET 122',
            name: 'Climate change and sustainable development',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/100-2/MET122_material.pdf' },
                { name: 'Case Studies', fileLink: 'workspace/100-2/MET122_cases.pdf' }
            ]
        },
        {
            code: 'MET 123',
            name: 'Meteorological Instrumentation II',
            type: 'Compulsory',
            materials: [
                { name: 'Lab Manual', fileLink: 'workspace/100-2/MET123_manual.pdf' },
                { name: 'Safety Guidelines', fileLink: 'workspace/100-2/MET123_safety.pdf' }
            ]
        },
        {
            code: 'MET 124',
            name: 'Map Analysis and Meteorological Data Graphics',
            type: 'Compulsory',
            materials: [
                { name: 'Course Notes', fileLink: 'workspace/100-2/MET124_notes.pdf' },
                { name: 'Practical Guide', fileLink: 'workspace/100-2/MET124_guide.pdf' }
            ]
        },
        {
            code: 'CSC 120',
            name: 'COMPUTER AS A PROBLEM SOLVING TOOL',
            type: 'Elective',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/100-2/CSC120_material.pdf' },
                { name: 'Lab Manual', fileLink: 'workspace/100-2/CSC120_lab.pdf' }
            ]
        },
        {
            code: 'CSC 121',
            name: 'SOFTWARE WORKSHOP II',
            type: 'Elective',
            materials: [
                { name: 'Workshop Manual', fileLink: 'workspace/100-2/CSC121_manual.pdf' },
                { name: 'Project Guidelines', fileLink: 'workspace/100-2/CSC121_project.pdf' }
            ]
        },
        {
            code: 'MAT 122',
            name: 'CALCULUS',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/100-2/MAT122_notes.pdf' },
                { name: 'Tutorial Questions', fileLink: 'workspace/100-2/MAT122_tutorials.pdf' }
            ]
        },
        {
            code: 'MAT 123',
            name: 'MECHANICS I',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/100-2/MAT123_material.pdf' },
                { name: 'Problem Set', fileLink: 'workspace/100-2/MAT123_problems.pdf' }
            ]
        },
    ],
    '200-1': [
        {
            code: 'GST 201',
            name: 'General African Studies I',
            type: 'Compulsory',
            materials: [
                { name: 'Course Notes', fileLink: 'workspace/200-1/GST201_notes.pdf' },
                { name: 'Study Materials', fileLink: 'workspace/200-1/GST201_materials.pdf' }
            ]
        },
        {
            code: 'MET 211',
            name: 'Atmospheric Environment II',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/200-1/MET211_notes.pdf' },
                { name: 'Lab Manual', fileLink: 'workspace/200-1/MET211_lab.pdf' }
            ]
        },
        {
            code: 'MET 212',
            name: 'Codes. Obsv. & Plotting',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/200-1/MET212_material.pdf' },
                { name: 'Practical Guide', fileLink: 'workspace/200-1/MET212_guide.pdf' }
            ]
        },
        {
            code: 'GRY 230',
            name: 'Elements of Remote Sensing',
            type: 'Elective',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/200-1/GRY230_notes.pdf' },
                { name: 'Remote Sensing Data', fileLink: 'workspace/200-1/GRY230_data.pdf' }
            ]
        },
        {
            code: 'GRY 212',
            name: 'Elements of Climatology and Climate Change',
            type: 'Compulsory',
            materials: [
                { name: 'Course Notes', fileLink: 'workspace/200-1/GRY212_notes.pdf' },
                { name: 'Case Studies', fileLink: 'workspace/200-1/GRY212_cases.pdf' }
            ]
        },
        {
            code: 'MAT 233',
            name: 'Mathematical Methods I',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/200-1/MAT233_notes.pdf' },
                { name: 'Problem Set', fileLink: 'workspace/200-1/MAT233_problems.pdf' }
            ]
        },
        {
            code: 'MAT 216',
            name: 'Numeric Analysis I',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/200-1/MAT216_material.pdf' },
                { name: 'Lab Manual', fileLink: 'workspace/200-1/MAT216_lab.pdf' }
            ]
        },
        {
            code: 'PHS 216',
            name: 'Electronics I',
            type: 'Elective',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/200-1/PHS216_notes.pdf' },
                { name: 'Circuit Diagrams', fileLink: 'workspace/200-1/PHS216_circuits.pdf' }
            ]
        },
    ],
    '200-2': [
        {
            code: 'MET 101',
            name: 'Introduction to Meteorology',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/200-2/MET101_2_notes.pdf' },
                { name: 'Practice Questions', fileLink: 'workspace/200-2/MET101_2_practice.pdf' }
            ]
        },
        {
            code: 'MET 102',
            name: 'Atmospheric Physics',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/200-2/MET102_material.pdf' },
                { name: 'Lab Manual', fileLink: 'workspace/200-2/MET102_lab.pdf' }
            ]
        },
        {
            code: 'CLM 101',
            name: 'Climate Systems',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/200-2/CLM101_notes.pdf' },
                { name: 'Case Studies', fileLink: 'workspace/200-2/CLM101_cases.pdf' }
            ]
        },
    ],
    '300-1': [
        {
            code: 'MET 301',
            name: 'Advanced Meteorology',
            type: 'Compulsory',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/300-1/MET301_material.pdf' },
                { name: 'Advanced Topics', fileLink: 'workspace/300-1/MET301_topics.pdf' }
            ]
        },
        {
            code: 'MET 302',
            name: 'Climate Dynamics',
            type: 'Compulsory',
            materials: [
                { name: 'Lecture Notes', fileLink: 'workspace/300-1/MET302_notes.pdf' },
                { name: 'Research Articles', fileLink: 'workspace/300-1/MET302_research.pdf' }
            ]
        },
        {
            code: 'CLM 201',
            name: 'Climate Change Mitigation',
            type: 'Elective',
            materials: [
                { name: 'Course Material', fileLink: 'workspace/300-1/CLM201_material.pdf' },
                { name: 'Project Guidelines', fileLink: 'workspace/300-1/CLM201_project.pdf' }
            ]
        },
    ],
    '300-2': [
        {
            code: 'MET 311',
            name: 'Meteorological Modeling',
            type: 'Compulsory',
            materials: [
                { name: 'Model Guide', fileLink: 'workspace/300-2/MET311_guide.pdf' },
                { name: 'Practical Manual', fileLink: 'workspace/300-2/MET311_manual.pdf' }
            ]
        },
        {
            code: 'MET 312',
            name: 'Applied Climatology',
            type: 'Compulsory',
            materials: [
                { name: 'Course Notes', fileLink: 'workspace/300-2/MET312_notes.pdf' },
                { name: 'Field Studies', fileLink: 'workspace/300-2/MET312_field.pdf' }
            ]
        },
        {
            code: 'CLM 301',
            name: 'Climate Policy',
            type: 'Elective',
            materials: [
                { name: 'Policy Papers', fileLink: 'workspace/300-2/CLM301_papers.pdf' },
                { name: 'Project Report', fileLink: 'workspace/300-2/CLM301_report.pdf' }
            ]
        },
    ],
};

let currentSemester = null;
let currentCourseLink = '';

function showCourses() {
const select = document.getElementById('semesterSelect');
currentSemester = select.value;
if (currentSemester) {
	document.getElementById('modalTitle').textContent = `Password for ${select.options[select.selectedIndex].text}`;
	document.getElementById('passwordModal').style.display = 'flex';
	document.getElementById('errorMessage').style.display = 'none';
	document.getElementById('passwordInput').value = '';
}
}

function checkPassword() {
    const enteredPassword = document.getElementById('passwordInput').value;
    if (enteredPassword === passwords[currentSemester]) {
        isVerified = true; // Set verification state
        displayCourses();
        closeModal();
        if (window.innerWidth >= 1024) {
            document.querySelector('.container').classList.add('password-verified');
        }
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function displayCourses() {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';

    courseData[currentSemester].forEach(course => {
        const button = document.createElement('div');
        button.className = 'course-btn';
        button.innerHTML = `
            <div class="course-info" onclick="toggleMaterials('${course.code}')">
                <div class="course-header">
                    <div class="course-code">${course.code}</div>
                    <div class="course-type">${course.type}</div>
                </div>
                <div class="course-name">${course.name}</div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="course-materials" id="materials-${course.code}">
                ${course.materials ? course.materials.map(material => {
                    const fileExt = material.fileLink.toLowerCase().split('.').pop();
                    const isWordFile = ['docx', 'doc'].includes(fileExt);
                    const isPowerPoint = ['pptx', 'ppt'].includes(fileExt);
                    const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExt);
                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt);
                    
                    const absoluteUrl = window.location.protocol + '//' + window.location.host + '/' + material.fileLink;
                    let viewerUrl = '';
                    
                    if (isWordFile) {
                        viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
                    } else if (isPowerPoint) {
                        viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
                    } else if (isVideo || isImage) {
                        viewerUrl = material.fileLink;
                    } else {
                        viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(absoluteUrl)}`;
                    }
                    
                    const getFileIcon = () => {
                        if (isWordFile) return 'fa-file-word';
                        if (isPowerPoint) return 'fa-file-powerpoint';
                        if (isVideo) return 'fa-file-video';
                        if (isImage) return 'fa-file-image';
                        return 'fa-file-pdf';
                    };

                    const getFileColor = () => {
                        if (isWordFile) return '#0d6efd';
                        if (isPowerPoint) return '#ff6f00';
                        if (isVideo) return '#4caf50';
                        if (isImage) return '#9c27b0';
                        return '#dc3545';
                    };
                    
                    return `
                        <div class="material-item">
                            <div class="material-info">
                                <i class="fas ${getFileIcon()}" style="color: ${getFileColor()}"></i>
                                <span class="material-name">${material.name}</span>
                            </div>
                            <div class="material-actions">
                                <button class="action-btn view-btn" onclick="showDocViewer('${viewerUrl}', '${material.name}', '${fileExt}')" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <a href="${material.fileLink}" class="action-btn download-btn" title="Download" download>
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                        </div>
                    `;
                }).join('') : '<div class="no-materials">No materials available</div>'}
            </div>
        `;
        container.appendChild(button);
    });
    container.style.display = 'grid';
    setTimeout(() => {
        container.classList.add('active');
    }, 100);
}

function showDocViewer(url, title, fileType) {
    const viewer = document.getElementById('docViewer');
    const iframe = document.getElementById('docFrame');
    const viewerTitle = document.getElementById('docTitle');
    
    if (['mp4', 'webm', 'ogg'].includes(fileType)) {
        // Handle video files
        iframe.style.display = 'none';
        let video = document.getElementById('mediaViewer') || document.createElement('video');
        video.id = 'mediaViewer';
        video.controls = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.src = url;
        if (!document.getElementById('mediaViewer')) {
            iframe.parentNode.appendChild(video);
        }
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType)) {
        // Handle image files
        iframe.style.display = 'none';
        let img = document.getElementById('mediaViewer') || document.createElement('img');
        img.id = 'mediaViewer';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        img.src = url;
        if (!document.getElementById('mediaViewer')) {
            iframe.parentNode.appendChild(img);
        }
    } else {
        iframe.style.display = 'block';
        const mediaViewer = document.getElementById('mediaViewer');
        if (mediaViewer) mediaViewer.remove();

        const absoluteUrl = url.startsWith('http') ? url : window.location.origin + '/' + url;
        
        if (['doc', 'docx', 'ppt', 'pptx'].includes(fileType)) {
            iframe.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
        } else if (fileType === 'pdf') {
            // Use PDF.js viewer directly
            iframe.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(material.fileLink)}`;
        } else {
            window.open(url, '_blank');
            return;
        }
    }
    
    viewerTitle.textContent = title;
    viewer.style.display = 'block';
    document.getElementById('docOverlay').style.display = 'block';
}

function closeDocViewer() {
    const viewer = document.getElementById('docViewer');
    const iframe = document.getElementById('docFrame');
    const mediaViewer = document.getElementById('mediaViewer');
    
    // Revoke blob URL if it exists
    if (iframe.dataset.blobUrl) {
        URL.revokeObjectURL(iframe.dataset.blobUrl);
        delete iframe.dataset.blobUrl;
    }
    
    viewer.style.display = 'none';
    document.getElementById('docOverlay').style.display = 'none';
    iframe.src = '';
    if (mediaViewer) mediaViewer.remove();
}

// Add event listeners for closing
document.getElementById('docOverlay').addEventListener('click', closeDocViewer);
document.querySelector('.close-doc-btn').addEventListener('click', closeDocViewer);

let currentOpenMaterials = null;

function toggleMaterials(courseCode) {
    const materialsDiv = document.getElementById(`materials-${courseCode}`);
    const expandIcon = materialsDiv.parentElement.querySelector('.expand-icon');
    
    // If there's already an open section and it's different from the current one
    if (currentOpenMaterials && currentOpenMaterials !== materialsDiv) {
        // Close the previously open section
        currentOpenMaterials.style.maxHeight = null;
        currentOpenMaterials.style.height = '0';
        const prevIcon = currentOpenMaterials.parentElement.querySelector('.expand-icon');
        if (prevIcon) {
            prevIcon.style.transform = 'rotate(0deg)';
        }
    }

    // Toggle the clicked section
    if (materialsDiv === currentOpenMaterials) {
        // Close current section if it's already open
        materialsDiv.style.maxHeight = null;
        materialsDiv.style.height = '0';
        expandIcon.style.transform = 'rotate(0deg)';
        currentOpenMaterials = null;
    } else {
        // Open new section
        materialsDiv.style.maxHeight = 'none';  // Remove max-height restriction
        materialsDiv.style.height = materialsDiv.scrollHeight + "px";
        expandIcon.style.transform = 'rotate(180deg)';
        currentOpenMaterials = materialsDiv;
    }
}

function isDesktop() {
    return window.innerWidth >= 1024;
}

function closeModal() {
	document.getElementById('passwordModal').style.display = 'none';
	currentCourseLink = '';
	}

function accessCourse() {
	window.open(currentCourseLink, '_blank');
	closeModal();
}
// GPA Calculator functionality

// Courses units
const courseCredits = {
'100-1': {
	'GST 111': 2,
	'MTH 101': 2,
	'BIO 101': 2,
	'COS 101': 3,
	'BIO 107': 1,
	'CHM 101': 2,
	'CHM 107': 1,
	'MET 101': 2,
	'PHY 101': 2,
	'PHY 107': 1,
	'GEO 105': 2,
	'GEO 109': 2,
	'LAG-MET 131': 2,
	'LAG-MET 113': 2
},
'100-2': {
	'MET 121': 2,
	'MET 122': 2,
	'MET 123': 2,
	'MET 124': 2,
	'CSC 120': 3,
	'CSC 121': 3,
	'MAT 122': 3,
	'MAT 123': 3,
},
'200-1': {
	'GST 201': 2,
	'MET 211': 2,
	'MET 212': 2,
	'GRY 230': 2,
	'GRY 212': 2,
	'MAT 233': 3,
	'MAT 216': 3,
	'PHS 216': 2,
},
'200-2': {
	'MET 101': 3,
	'MET 102': 3,
	'CLM 101': 3,
},
'300-1': {
	'MET 301': 3,
	'MET 302': 3,
	'CLM 201': 3,
},
'300-2': {
	'MET 311': 3,
	'MET 312': 3,
	'CLM 301': 3,
},
};

//Grade Points
const gradePoints = {
'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0
};

function loadCoursesForGPA() {
	const semester = document.getElementById('gpaSemester').value;
	const courseList = document.getElementById('gpaCourseList');
	courseList.innerHTML = '';

	if (courseData[semester]) {
		courseData[semester].forEach(course => {
		// Skip GST courses
		if (course.code.startsWith('GST')) {
			return; // Skip this iteration
		}

		const units = courseCredits[semester][course.code] || 3; // Get units for the course
		const courseDiv = document.createElement('div');
		courseDiv.className = 'gpa-course';
		courseDiv.innerHTML = `
			<div style="flex: 1">${units} Units - ${course.code} - ${course.name} (${course.type})</div>
			<select class="grade-select" id="grade-${course.code}">
				<option value="">Select Grade</option>
				${Object.keys(gradePoints).map(grade => 
					`<option value="${grade}">${grade}</option>`
				).join('')}
			</select>
		`;
		courseList.appendChild(courseDiv);
	});
}
}

function calculateGPA() {
	const semester = document.getElementById('gpaSemester').value;
	const courses = courseData[semester] || [];
	let totalQualityPoints = 0;
	let totalUnits = 0;

	courses.forEach(course => {
		// Skip GST courses
		if (course.code.startsWith('GST')) {
			return; // Skip this iteration
		}
	
		const gradeSelect = document.getElementById(`grade-${course.code}`);
		const grade = gradeSelect.value.toUpperCase();
		const units = courseCredits[semester][course.code] || 3;
		
		if (grade && gradePoints[grade] !== undefined) {
			totalQualityPoints += units * gradePoints[grade];
			totalUnits += units;
		}
	});

	if (totalUnits === 0) {
		document.getElementById('gpaResult').textContent = 'Please select grades for at least one course';
		return;
}

	const gpa = totalQualityPoints / totalUnits;
	document.getElementById('gpaResult').textContent = 
	`Your GPA: ${gpa.toFixed(2)} (${totalUnits} units)`;
}




function openUrl() {
	window.location.href = 'blog.html';
}

// Add new search function after courseData declaration
function showSearchResults() {
    const searchInput = document.getElementById('courseSearch').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Clear and hide results if search is empty
    if (!searchInput) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        return;
    }
    
    resultsContainer.innerHTML = '';
    
    let results = [];
    
    // If in a semester, search within that semester including materials
    if (currentSemester) {
        results = courseData[currentSemester].filter(course => {
            const matchCourse = course.code.toLowerCase().includes(searchInput) || 
                              course.name.toLowerCase().includes(searchInput);
            // Also search in materials names
            const matchMaterials = course.materials && course.materials.some(material => 
                material.name.toLowerCase().includes(searchInput)
            );
            return matchCourse || matchMaterials;
        }).map(course => {
            // If match is in materials, find which material matched
            const matchedMaterial = course.materials?.find(material => 
                material.name.toLowerCase().includes(searchInput)
            );
            return {
                ...course,
                matchedMaterial
            };
        });
    } else {
        // Global search - only search course codes and names
        Object.entries(courseData).forEach(([semester, courses]) => {
            courses.forEach(course => {
                if (course.code.toLowerCase().includes(searchInput) || 
                    course.name.toLowerCase().includes(searchInput)) {
                    results.push({
                        ...course,
                        semester
                    });
                }
            });
        });
    }

    if (results.length > 0) {
        results.forEach(course => {
            const div = document.createElement('div');
            div.className = 'result-item';
            
            // Different display for semester-specific vs global search
            if (currentSemester) {
                div.innerHTML = course.matchedMaterial ? 
                    `${course.code} - ${course.name}<br><small>Material: ${course.matchedMaterial.name}</small>` :
                    `${course.code} - ${course.name}`;
            } else {
                div.innerHTML = `${course.code} - ${course.name} (${course.semester})`;
            }
            
            div.onclick = () => {
                if (!currentSemester) {
                    document.getElementById('semesterSelect').value = course.semester;
                    showCourses();
                } else {
                    const courseElement = document.getElementById(`materials-${course.code}`).parentElement;
                    courseElement.scrollIntoView({ behavior: 'smooth' });
                    if (course.matchedMaterial) {
                        toggleMaterials(course.code);
                    }
                }
                resultsContainer.style.display = 'none';
            };
            resultsContainer.appendChild(div);
        });
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<div class="result-item">No matches found</div>';
        resultsContainer.style.display = 'block';
    }
}

// Add this event listener
document.addEventListener('click', function(e) {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchInput = document.getElementById('courseSearch');
    
    // Hide results if clicking outside search area
    if (!resultsContainer.contains(e.target) && !searchInput.contains(e.target)) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
    }
});

// Update search input listener
document.getElementById('courseSearch').addEventListener('input', function(e) {
    if (!e.target.value.trim()) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
    } else {
        showSearchResults();
    }
});

function showMaterialsSummary() {
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = '';
    
    let summaryHTML = '';
    Object.entries(courseData).forEach(([semester, courses]) => {
        let totalMaterials = 0;
        courses.forEach(course => {
            if (course.materials) {
                totalMaterials += course.materials.length;
            }
        });
        
        summaryHTML += `
            <div class="semester-summary">
                <h4>${semester} Semester</h4>
                <p>Total Courses: ${courses.length}</p>
                <p>Total Materials: ${totalMaterials}</p>
                <p>Compulsory Courses: ${courses.filter(c => c.type === 'Compulsory').length}</p>
                <p>Elective Courses: ${courses.filter(c => c.type === 'Elective').length}</p>
            </div>
        `;
    });
    
    summaryContent.innerHTML = summaryHTML;
}