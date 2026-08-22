const defaultCourses = [
  {
    id: 'frontend-react',
    title: 'React Profissional',
    category: 'frontend',
    categoryLabel: 'Frontend',
    duration: '8 semanas',
    lessons: '32 aulas',
    price: 149,
    oldPrice: 219,
    rating: 4.9,
    badge: 'Mais vendido',
    badgeStyle: 'purple',
    description: 'Domine componentes, hooks, rotas e arquitetura moderna para construir interfaces profissionais.'
  },
  {
    id: 'backend-node',
    title: 'API com Node.js',
    category: 'backend',
    categoryLabel: 'Backend',
    duration: '10 semanas',
    lessons: '40 aulas',
    price: 169,
    oldPrice: 249,
    rating: 4.8,
    badge: 'Novo',
    badgeStyle: 'orange',
    description: 'Crie serviços escaláveis com autenticação, banco de dados, testes e integrações reais.'
  },
  {
    id: 'ui-design',
    title: 'UX/UI para Produtos',
    category: 'design',
    categoryLabel: 'Design',
    duration: '6 semanas',
    lessons: '24 aulas',
    price: 129,
    oldPrice: 199,
    rating: 4.9,
    badge: 'Popular',
    badgeStyle: 'purple',
    description: 'Aprenda pesquisa de usuários, wireframes, protótipos e sistemas de design impecáveis.'
  },
  {
    id: 'growth-marketing',
    title: 'Growth Marketing',
    category: 'marketing',
    categoryLabel: 'Marketing',
    duration: '7 semanas',
    lessons: '28 aulas',
    price: 139,
    oldPrice: 209,
    rating: 4.7,
    badge: 'Em alta',
    badgeStyle: 'orange',
    description: 'Estratégias de aquisição, análise de dados e campanhas que transformam tráfego em conversão.'
  },
  {
    id: 'fullstack-js',
    title: 'Fullstack JavaScript',
    category: 'frontend',
    categoryLabel: 'Frontend',
    duration: '12 semanas',
    lessons: '50 aulas',
    price: 199,
    oldPrice: 289,
    rating: 5.0,
    badge: 'Top 1',
    badgeStyle: 'purple',
    description: 'Construa uma aplicação completa do zero, do front-end ao deploy em produção.'
  },
  {
    id: 'sql-data',
    title: 'SQL e Analytics',
    category: 'backend',
    categoryLabel: 'Backend',
    duration: '5 semanas',
    lessons: '20 aulas',
    price: 119,
    oldPrice: 179,
    rating: 4.8,
    badge: 'Essencial',
    badgeStyle: 'purple',
    description: 'Entenda consultas, modelagem e análise de dados para transformar informação em decisão.'
  }
];

const STORAGE_KEY = 'academy-nova-era-courses';

const state = {
  filter: 'all',
  selected: new Set(['frontend-react'])
};

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

function safeReadCourses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [...defaultCourses];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultCourses];
  } catch (error) {
    return [...defaultCourses];
  }
}

function saveCourses(courses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.warn('Não foi possível salvar os cursos no navegador.', error);
  }
}

function getCourses() {
  return safeReadCourses();
}

function formatPrice(value) {
  return currency.format(Number(value || 0));
}

function getSelectedCourses() {
  const courses = getCourses();
  return courses.filter((course) => state.selected.has(course.id));
}

function updateStats() {
  const activeCoursesCount = document.getElementById('activeCoursesCount');
  const selectedCoursesCount = document.getElementById('selectedCoursesCount');

  if (activeCoursesCount) {
    activeCoursesCount.textContent = String(getCourses().length);
  }

  if (selectedCoursesCount) {
    selectedCoursesCount.textContent = String(getSelectedCourses().length);
  }
}

function renderCourses() {
  const courseGrid = document.getElementById('courseGrid');
  const courses = getCourses();
  const filteredCourses = state.filter === 'all'
    ? courses
    : courses.filter((course) => course.category === state.filter);

  courseGrid.innerHTML = filteredCourses
    .map((course) => {
      const selected = state.selected.has(course.id);
      return `
        <article class="course-card">
          <div class="card-top">
            <span class="tag ${course.badgeStyle === 'orange' ? 'orange' : ''}">${course.badge || 'Curso'}</span>
            <span class="rating">★ ${Number(course.rating || 4.8).toFixed(1)}</span>
          </div>

          <h3>${course.title}</h3>
          <div class="course-meta">
            <span>${course.categoryLabel}</span>
            <span>${course.duration}</span>
            <span>${course.lessons}</span>
          </div>

          <p class="course-desc">${course.description}</p>

          <div class="card-footer">
            <div class="price">
              <strong>${formatPrice(course.price)}</strong>
              <span>${formatPrice(course.oldPrice)}</span>
            </div>

            <div class="card-actions">
              <button class="select-btn ${selected ? 'selected' : ''}" type="button" data-course-id="${course.id}">
                ${selected ? 'Selecionado' : 'Adicionar'}
              </button>
              <button class="delete-btn" type="button" data-delete-id="${course.id}" aria-label="Excluir ${course.title}">Excluir</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  updateStats();
}

function updateSummary() {
  const selectedCourses = getSelectedCourses();
  const checkoutList = document.getElementById('checkoutList');
  const itemsCount = document.getElementById('itemsCount');
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const totalEl = document.getElementById('total');

  itemsCount.textContent = `${selectedCourses.length} ${selectedCourses.length === 1 ? 'curso' : 'cursos'}`;

  if (!selectedCourses.length) {
    checkoutList.innerHTML = '<p class="empty-state">Nenhum curso selecionado ainda.</p>';
    subtotalEl.textContent = formatPrice(0);
    discountEl.textContent = '- ' + formatPrice(0);
    totalEl.textContent = formatPrice(0);
    return;
  }

  const subtotal = selectedCourses.reduce((sum, course) => sum + Number(course.price), 0);
  const discount = selectedCourses.reduce((sum, course) => sum + (Number(course.oldPrice || course.price) - Number(course.price)), 0);
  const total = subtotal;

  checkoutList.innerHTML = selectedCourses
    .map(
      (course) => `
        <div class="checkout-item">
          <div>
            <strong>${course.title}</strong>
            <span>${course.duration}</span>
          </div>
          <strong>${formatPrice(course.price)}</strong>
        </div>
      `
    )
    .join('');

  subtotalEl.textContent = formatPrice(subtotal);
  discountEl.textContent = '- ' + formatPrice(discount);
  totalEl.textContent = formatPrice(total);
}

function toggleCourse(courseId) {
  const selected = state.selected;

  if (selected.has(courseId)) {
    selected.delete(courseId);
  } else {
    selected.add(courseId);
  }

  renderCourses();
  updateSummary();
}

function deleteCourse(courseId) {
  const courses = getCourses();
  const courseExists = courses.some((course) => course.id === courseId);

  if (!courseExists) return;

  const updatedCourses = courses.filter((course) => course.id !== courseId);
  saveCourses(updatedCourses);

  state.selected.delete(courseId);

  if (state.filter !== 'all' && !updatedCourses.some((course) => course.category === state.filter)) {
    state.filter = 'all';
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === 'all');
    });
  }

  renderCourses();
  updateSummary();
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      renderCourses();
    });
  });
}

function initCourseSelection() {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.select-btn');
    if (trigger) {
      toggleCourse(trigger.dataset.courseId);
      return;
    }

    const deleteTrigger = event.target.closest('.delete-btn');
    if (deleteTrigger) {
      deleteCourse(deleteTrigger.dataset.deleteId);
    }
  });
}

function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.slider-dot');

  if (!testimonials.length || !dots.length) return;

  let currentIndex = 0;

  const showSlide = (index) => {
    testimonials.forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showSlide(currentIndex);
  }, 5000);
}

function initFaq() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-question');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((faqItem) => {
        faqItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((item) => {
    item.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initCourseForm() {
  const form = document.getElementById('courseForm');
  const resetButton = document.getElementById('resetDefaultCourses');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = String(formData.get('title') || '').trim();
    const category = String(formData.get('category') || 'frontend');
    const price = Number(formData.get('price'));
    const oldPrice = Number(formData.get('oldPrice')) || price + 60;
    const duration = String(formData.get('duration') || '').trim();
    const lessons = String(formData.get('lessons') || '').trim();
    const description = String(formData.get('description') || '').trim();

    if (!title || !duration || !lessons || !description || !price || price <= 0) {
      alert('Preencha todos os campos obrigatórios com valores válidos.');
      return;
    }

    const labelMap = {
      frontend: 'Frontend',
      backend: 'Backend',
      design: 'Design',
      marketing: 'Marketing'
    };

    const newCourse = {
      id: `custom-${Date.now()}`,
      title,
      category,
      categoryLabel: labelMap[category] || 'Frontend',
      duration,
      lessons,
      price,
      oldPrice,
      rating: 4.9,
      badge: 'Novo',
      badgeStyle: 'orange',
      description
    };

    const updatedCourses = [...getCourses(), newCourse];
    saveCourses(updatedCourses);

    form.reset();
    state.filter = 'all';
    document.querySelectorAll('.filter-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === 'all');
    });

    renderCourses();
    updateSummary();
    alert(`Curso adicionado com sucesso: ${title}`);
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      saveCourses([...defaultCourses]);
      state.selected = new Set(['frontend-react']);
      state.filter = 'all';
      document.querySelectorAll('.filter-btn').forEach((button) => {
        button.classList.toggle('active', button.dataset.filter === 'all');
      });
      renderCourses();
      updateSummary();
      alert('Cursos restaurados para o padrão inicial.');
    });
  }
}

function initLeadForm() {
  const form = document.getElementById('leadForm');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();

    if (!nameValue || !emailValue) {
      alert('Preencha seu nome e e-mail para continuar.');
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!emailIsValid) {
      alert('Digite um e-mail válido.');
      return;
    }

    alert(`Tudo pronto, ${nameValue}! Em breve entraremos em contato no e-mail ${emailValue}.`);
    form.reset();
  });
}

function initCheckoutButton() {
  const button = document.getElementById('checkoutBtn');

  if (!button) return;

  button.addEventListener('click', () => {
    const selectedCourses = getSelectedCourses();
    if (!selectedCourses.length) {
      alert('Selecione pelo menos um curso antes de finalizar a matrícula.');
      return;
    }

    const names = selectedCourses.map((course) => course.title).join(', ');
    alert(`Sua matrícula foi confirmada para: ${names}. Em breve você receberá o acesso e os próximos passos por e-mail.`);
  });
}

function initFooterYear() {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  updateSummary();
  initFilters();
  initCourseSelection();
  initTestimonials();
  initFaq();
  initMenu();
  initCourseForm();
  initLeadForm();
  initCheckoutButton();
  initFooterYear();
});
