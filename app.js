const sidebarLinks = document.querySelectorAll('.sidebar nav a');
const sections = document.querySelectorAll('.section');
const overviewSection = document.getElementById('section-overview');
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.getElementById('closeSidebar');

// Navigation link functionality
sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Active state update
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Section toggle
    const targetId = 'section-' + link.getAttribute('href').substring(1);
    sections.forEach(section => section.classList.add('hidden'));
    const target = document.getElementById(targetId);
    if (target) target.classList.remove('hidden');

    // Overview section special handling
    if (targetId === 'section-overview') {
      overviewSection.classList.remove('hidden');
    } else {
      overviewSection.classList.add('hidden');
    }

    // Auto-close sidebar on small screens
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('visible');
      sidebar.classList.add('hidden');
    }
  });
});

// Sidebar toggle open
toggleBtn?.addEventListener('click', () => {
  sidebar.classList.remove('hidden');
  sidebar.classList.add('visible');
});

// Sidebar close
closeBtn?.addEventListener('click', () => {
  sidebar.classList.remove('visible');
  sidebar.classList.add('hidden');
});

// Responsive initial state
window.addEventListener('load', () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.add('hidden');
  }
});

// Chart rendering on load
window.addEventListener('load', () => {
  const ctxUsers = document.getElementById('usersChart')?.getContext('2d');
  const ctxSales = document.getElementById('salesChart')?.getContext('2d');

  if (ctxUsers) {
    new Chart(ctxUsers, {
      type: 'pie',
      data: {
        labels: ['New Members', 'Returning', 'Inactive'],
        datasets: [{
          label: 'User Distribution',
          data: [75, 35, 15],
          backgroundColor: ['#4b00e0', '#6c63ff', '#ccc'],
        }]
      }
    });
  }

  if (ctxSales) {
    new Chart(ctxSales, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Books Borrowed (Past 7 Days)',
          data: [42, 58, 34, 47, 63, 25, 38],
          backgroundColor: '#4b00e0',
          borderRadius: 10
        }]
      }
    });
  }
});

// Dark mode toggle
const toggleDark = document.getElementById('darkModeToggle');
toggleDark?.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

const userCard = document.getElementById('userCard');
const dropdownMenu = document.getElementById('dropdownMenu');
let isDropdownOpen = false;

userCard?.addEventListener('click', () => {
  isDropdownOpen = !isDropdownOpen;
  dropdownMenu.style.display = isDropdownOpen ? 'block' : 'none';
});

document.addEventListener('click', (e) => {
  if (!userCard.contains(e.target)) {
    isDropdownOpen = false;
    dropdownMenu.style.display = 'none';
  }
});

const bellIcon = document.getElementById('notifIcon');
bellIcon?.addEventListener('click', () => {
  bellIcon.classList.add('fa-shake');
  setTimeout(() => bellIcon.classList.remove('fa-shake'), 500);
});
