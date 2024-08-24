document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const formSections = document.querySelectorAll(".form-section");

    const options = [
        // Opciones para la pregunta de Situación (2)
        ["Comandancia de la Guardia Civil de Madrid", "Redes Sociales y Televisión", "Patrullas de policía nacional y local en zona", "Aeropuerto de Madrid - Barajas", "Ayuntamiento de Madrid", "Información de AENA del Ayuntamiento de Barajas", "Ministerio de Defensa", "Centro de coordinación emergencias 112", "Sistema de integrado de video vigilancia de Madrid – Policía Nacional"
        ],
        // Opciones para la pregunta de Decisión (3)
        ["Coordinación entre UCO Wizink y Policía Nacional", "Bloqueo del tráfico de la provincia de Madrid", "Informar desde UCO Wizink que personas salgan con cuidado.", "Cierre del Aeropuerto de Madrid-Barajas", "Informar desde UCO wizink que personas no salgan a la calle y mantengan la cama", "Cierre del espacio aéreo sobre Madrid ", "Activación del plan ante atentados, cierre de zona y envío de unidades especiales", "Envío de unidades antidisturbios", "Interrupción de trenes de cercanías y metro de Madrid"],
        // Opciones para la pregunta de Comunicación (4)
        ["Se debe realizar declaración institucional por el Alcalde de Madrid", "Se debe realizar declaración institucional por el Ministro del Interior", "Declaración institucional por el Fiscal General", "Se informa de activación de plan antiterrorista y llamada a la colaboración ", "No se informa institucionalmente", "Se informa de activación del Ejército.", "Se informa proporcionando todos los detalles conocidos ", "Se informa de posibles victimas", "Se informa en redes sociales de actuaciones en casa instante"]
    ];

    formSections.forEach(section => section.classList.add('hidden'));

    cards.forEach(card => {
        card.addEventListener("click", function (event) {
            event.preventDefault();
            const targetForm = document.getElementById(card.dataset.target);

            formSections.forEach(section => {
                section.classList.add('hidden');
                section.classList.remove("active");
            });

            targetForm.classList.remove('hidden');
            setTimeout(() => {
                targetForm.classList.add("active");
                targetForm.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        });
    });

    function generateOptions(questionIndex, optionsList) {
        const questionDiv = document.getElementById(`options${questionIndex + 2}`);
        optionsList.forEach(option => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";
            checkbox.name = `question${questionIndex + 2}`;
            checkbox.value = option;

            const label = document.createElement("label");
            label.className = "form-check-label";
            label.textContent = option;

            const div = document.createElement("div");
            div.className = "form-check";
            div.appendChild(checkbox);
            div.appendChild(label);
            questionDiv.appendChild(div);

            checkbox.addEventListener("change", function () {
                const checkedCheckboxes = questionDiv.querySelectorAll('input[type="checkbox"]:checked');
                questionDiv.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                    cb.disabled = checkedCheckboxes.length >= 3 && !cb.checked;
                    cb.parentNode.classList.toggle("disabled-checkbox", cb.disabled);
                });
            });
        });
    }

    options.forEach((optionsList, index) => generateOptions(index, optionsList));

    document.querySelectorAll("form[id^='examForm']").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const currentFormSection = form.parentElement;
            const formData = new FormData(form);
            const selectedAnswers = [];

            formData.forEach((value, key) => {
                selectedAnswers.push(value);
            });

            updateChart(form.id, selectedAnswers);

            currentFormSection.classList.add('fade-out');
            setTimeout(() => {
                currentFormSection.classList.remove('active');
                currentFormSection.classList.add('hidden');
                currentFormSection.classList.remove('fade-out');
            }, 500);

            $('#confirmationModal').modal('show');

            let countdown = 5;
            const countdownElement = document.getElementById('countdown');

            const timer = setInterval(() => {
                countdownElement.textContent = countdown--;
                if (countdown < 0) {
                    clearInterval(timer);
                    window.close();
                }
            }, 1000);
        });
    });


});