const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 150);
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.fade-up, .fade-side-left, .fade-side-right, .fade-in').forEach(el => {
    observer.observe(el);
});


const toggle1 = document.querySelector('.toggle1');
const toggle2 = document.querySelector('.toggle2');


toggle2.addEventListener('click', () => {
    toggle2.classList.add('active');
    toggle1.classList.remove('active');

    const saveDiv = toggle1.querySelector('.save');
    if (saveDiv) {
        saveDiv.style.backgroundColor = 'black';
        saveDiv.style.color = 'white';
    }
    document.querySelector('.price.basic-price .amount').textContent = '$32';
    document.querySelector('.price.enterprise .amount').textContent = '$56';
});

toggle1.addEventListener('click', () => {
    toggle1.classList.add('active');
    toggle2.classList.remove('active');

    const saveDiv = toggle1.querySelector('.save');
    if (saveDiv) {
        saveDiv.style.backgroundColor = 'white';
        saveDiv.style.color = 'black';
    }
    document.querySelector('.price.basic-price .amount').textContent = '$23';
    document.querySelector('.price.enterprise .amount').textContent = '$48';
});


