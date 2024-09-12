document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function populateEventOptions() {
    const dateSelect = document.getElementById('event-date');
    const eventSelect = document.getElementById('event');
    const dates = document.querySelectorAll('.date-title');

    dates.forEach((date) => {
        const option = document.createElement('option');
        option.value = date.textContent.trim();
        option.textContent = date.textContent.trim();
        dateSelect.appendChild(option);
    });

    dateSelect.addEventListener('change', function() {
        updateEventOptions(this.value);
    });
}

function updateEventOptions(selectedDate) {
    const eventSelect = document.getElementById('event');
    eventSelect.innerHTML = '<option value="">Selecione um evento</option>';

    const events = document.querySelectorAll('.event-card');
    events.forEach((event) => {
        const eventDate = event.closest('.card-container').previousElementSibling.textContent.trim();
        if (eventDate === selectedDate) {
            const eventTitle = event.querySelector('.event-title').textContent;
            const eventTime = event.querySelector('.event-info').textContent;
            const availableSlots = parseInt(event.querySelector('.event-slots').dataset.slots);
            const option = document.createElement('option');
            option.value = eventTitle;
            option.textContent = `${eventTitle} - ${eventTime}`;
            if (availableSlots === 0) {
                option.disabled = true;
                option.textContent += ' (Esgotado)';
            }
            eventSelect.appendChild(option);
        }
    });
}

document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const eventDate = document.getElementById('event-date').value;
    const event = document.getElementById('event').value;

    const selectedEvent = Array.from(document.querySelectorAll('.event-card'))
        .find(eventCard => eventCard.querySelector('.event-title').textContent === event);
    const availableSlots = selectedEvent ? parseInt(selectedEvent.querySelector('.event-slots').dataset.slots) : 0;

    if (availableSlots > 0) {

        console.log('Form submitted:', { name, email, eventDate, event });

        updateAvailableSlots(eventDate, event);

        document.getElementById('confirmation-message').style.display = 'block';
        this.reset();
    } else {
        alert('Desculpe, não há mais vagas disponíveis para este evento.');
    }
});

function updateAvailableSlots(date, eventName) {
    const events = document.querySelectorAll('.event-card');
    events.forEach((event) => {
        const eventDate = event.closest('.card-container').previousElementSibling.textContent.trim();
        const eventTitle = event.querySelector('.event-title').textContent;
        if (eventDate === date && eventTitle === eventName) {
            const slotsElement = event.querySelector('.event-slots');
            const eventButton = event.querySelector('.event-btn');
            let availableSlots = parseInt(slotsElement.dataset.slots);
            if (availableSlots > 0) {
                availableSlots--;
                slotsElement.dataset.slots = availableSlots;
                slotsElement.textContent = `Vagas disponíveis: ${availableSlots}`;
                eventButton.dataset.slots = availableSlots;
                
                if (availableSlots === 0) {
                    eventButton.classList.add('disabled');
                    eventButton.textContent = 'Esgotado';
                    eventButton.removeAttribute('href');
                }
            }
        }
    });
}

document.querySelectorAll('.event-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const date = this.dataset.date;
        const event = this.dataset.event;
        populateForm(date, event);
        document.querySelector('#inscricao').scrollIntoView({ behavior: 'smooth' });
    });
});

function populateForm(date, event) {
    const dateSelect = document.getElementById('event-date');
    const eventSelect = document.getElementById('event');
    
    dateSelect.value = date;
    updateEventOptions(date);
    eventSelect.value = event;
}

populateEventOptions();

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active'); 
});

document.querySelectorAll('nav a').forEach(link => {
link.addEventListener('click', function() {
nav.classList.remove('active');
menuToggle.classList.remove('active');
});
});