document.addEventListener('DOMContentLoaded', () => {
    // --- UTILITY FUNCTION: Update and save marks locally ---
    function updateMarksInHTML(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            // Highlight change for visual confirmation
            element.style.backgroundColor = '#ffff99'; 
            setTimeout(() => { element.style.backgroundColor = 'transparent'; }, 500);
        }
    }

    // --- 1. Image Selector Logic (Local Preview) ---
    const imageSelector = document.getElementById('image-selector');
    const profilePic = document.getElementById('profile-pic');
    if (imageSelector && profilePic) {
        imageSelector.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) { profilePic.src = e.target.result; };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // --- 2. Resume Toggle Logic (Local Control) ---
    const resumeToggle = document.getElementById('resume-toggle');
    const resumeButton = document.getElementById('resume-button');
    if (resumeToggle && resumeButton) {
        if (!resumeToggle.checked) { resumeButton.style.display = 'none'; }
        resumeToggle.addEventListener('change', function() {
            resumeButton.style.display = this.checked ? 'inline-block' : 'none';
        });
    }

    // --- 3. Content Edit Mode Toggle ---
    const editToggle = document.getElementById('edit-toggle');
    const editableElements = document.querySelectorAll('.editable-content h3, .editable-content p, .editable-content li, #about h1, #about p, .college-name');
    const removeItemBtns = document.querySelectorAll('.remove-item-btn');
    const addItemBtns = document.querySelectorAll('.add-item-btn');
    
    let isEditMode = false;

    function toggleEditMode(enable) {
        isEditMode = enable;
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', enable ? 'true' : 'false');
            el.style.border = enable ? '1px dashed #e74c3c' : 'none';
        });

        const displayStyle = enable ? 'block' : 'none';
        removeItemBtns.forEach(btn => btn.style.display = displayStyle);
        addItemBtns.forEach(btn => btn.style.display = 'inline-block'); 
        if (!enable) { addItemBtns.forEach(btn => btn.style.display = 'none'); }
    }

    if (editToggle) {
        editToggle.addEventListener('click', () => {
            toggleEditMode(!isEditMode);
            editToggle.textContent = isEditMode ? 'Exit Edit Mode (Copy Changes)' : 'Toggle Edit Mode';
            editToggle.style.backgroundColor = isEditMode ? '#27ae60' : '#2c3e50'; 
        });
        toggleEditMode(false);
    }
    
    // --- 4. NEW: Edit Marks Button Logic ---
    const marksEditToggle = document.getElementById('marks-edit-toggle');
    if (marksEditToggle) {
        marksEditToggle.addEventListener('click', () => {
            // Edit College Name
            const collegeName = prompt("Enter your Engineering College Name:", document.querySelector('.college-name').textContent);
            if (collegeName !== null) {
                document.querySelector('.college-name').textContent = collegeName;
            }
            
            // Edit CGPA
            const cgpa = prompt("Enter Total CGPA (e.g., 8.50):", document.getElementById('total-cgpa').textContent);
            if (cgpa !== null) { updateMarksInHTML('total-cgpa', cgpa); }

            // Edit PUC/12th Percentage
            const puc = prompt("Enter 2nd PUC / 12th Percentage (e.g., 90.50%):", document.getElementById('puc-perc').textContent);
            if (puc !== null) { updateMarksInHTML('puc-perc', puc); }
            
            // Edit 10th Percentage
            const tenth = prompt("Enter 10th Grade Percentage (e.g., 92.00%):", document.getElementById('tenth-perc').textContent);
            if (tenth !== null) { updateMarksInHTML('tenth-perc', tenth); }

            // Edit SGPA for 8 Semesters
            document.querySelectorAll('#sgpa-marks span').forEach(span => {
                const sem = span.getAttribute('data-sem');
                const currentSgpa = span.textContent;
                const newSgpa = prompt(`Enter SGPA for Semester ${sem}:`, currentSgpa);
                if (newSgpa !== null) {
                    span.textContent = newSgpa;
                    span.style.backgroundColor = '#ffff99'; 
                    setTimeout(() => { span.style.backgroundColor = 'transparent'; }, 500);
                }
            });

            alert("Marks updated successfully! Remember to copy the updated HTML source code into your VS Code file to save permanently.");
        });
    }

    // --- 5. Add/Remove Project/Skill Logic (Delegated Listeners) ---
    // (Existing Add/Remove logic here... ensuring it works with the new setup)
    const skillTemplate = `
        <div class="skill-card new-item">
            <h3 contenteditable="true">New Skill Category</h3>
            <ul class="editable-list" contenteditable="true">
                <li>New Skill 1</li>
                <li>New Skill 2</li>
            </ul>
            <button class="remove-item-btn" style="display:block;">Remove</button>
        </div>`;
    // ... (rest of add/remove listeners as defined in the previous full code block) ...
});