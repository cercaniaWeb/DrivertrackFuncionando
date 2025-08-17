import React, { useState, useEffect } from 'react';
import { 
  Car, 
  User, 
  Key, 
  Bell, 
  Menu, 
  X, 
  Home, 
  Wallet, 
  Wrench, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  BarChart3,
  Calendar,
  Ticket,
  Upload,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  CreditCard,
  Camera,
  Check,
  X as XIcon,
  Fuel,
  Zap,
  AlertTriangle,
  MessageSquare,
  UserCheck,
  UserX,
  Archive,
  Paperclip,
  Send,
  UserCircle,
  Shield,
  IdCard,
  MapPin as MapPinIcon,
  DollarSign,
  FileCheck,
  FileText as FileTextIcon,
  Mail,
  MessageCircle,
  Hash,
  CalendarDays,
  Image,
  FileImage,
  StickyNote,
  BellRing,
  CalendarCheck,
  CalendarPlus,
  Lock,
  Unlock,
  EyeOff,
  Eye as EyeVisible
} from 'lucide-react';

// Main App Component
const App = () => {
  // State management for the entire application
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Form states
  const [deductionForm, setDeductionForm] = useState({
    amount: '',
    reason: '',
    otherReason: '',
    receipt: null
  });
  
  const [ticketForm, setTicketForm] = useState({
    type: '',
    severity: 'medium',
    description: ''
  });
  
  const [messageForm, setMessageForm] = useState({
    recipients: [],
    message: '',
    image: null
  });
  
  const [paymentForm, setPaymentForm] = useState({
    accountId: null,
    evidence: null
  });
  
  // UI states
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    photo: null,
    phone: '',
    name: '',
    email: '',
    socialSecurity: '',
    address: '',
    licensePhoto: null
  });
  
  const [viewingDeduction, setViewingDeduction] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [viewingPayment, setViewingPayment] = useState(null);

  // Mock data for the application
  // Users data - includes conductors, admin, and owner
  const [users, setUsers] = useState([
    { id: 1, email: 'conductor1@drivertrack.com', password: '123456', role: 'conductor', name: 'Carlos Méndez', avatar: 'CM', vehicleId: 1, email: 'carlos.mendez@email.com', phone: '555-1234' },
    { id: 2, email: 'conductor2@drivertrack.com', password: '123456', role: 'conductor', name: 'Ana López', avatar: 'AL', vehicleId: 2, email: 'ana.lopez@email.com', phone: '555-5678' },
    { id: 3, email: 'conductor3@drivertrack.com', password: '123456', role: 'conductor', name: 'Pedro Gómez', avatar: 'PG', vehicleId: 3, email: 'pedro.gomez@email.com', phone: '555-9012' },
    { id: 4, email: 'conductor4@drivertrack.com', password: '123456', role: 'conductor', name: 'María Rodríguez', avatar: 'MR', vehicleId: 4, email: 'maria.rodriguez@email.com', phone: '555-3456' },
    { id: 5, email: 'conductor5@drivertrack.com', password: '123456', role: 'conductor', name: 'José Hernández', avatar: 'JH', vehicleId: 5, email: 'jose.hernandez@email.com', phone: '555-7890' },
    { id: 6, email: 'conductor6@drivertrack.com', password: '123456', role: 'conductor', name: 'Laura Sánchez', avatar: 'LS', vehicleId: 6, email: 'laura.sanchez@email.com', phone: '555-2345' },
    { id: 7, email: 'conductor7@drivertrack.com', password: '123456', role: 'conductor', name: 'Roberto Díaz', avatar: 'RD', vehicleId: 7, email: 'roberto.diaz@email.com', phone: '555-6789' },
    { id: 8, email: 'conductor8@drivertrack.com', password: '123456', role: 'conductor', name: 'Sofía Martínez', avatar: 'SM', vehicleId: 8, email: 'sofia.martinez@email.com', phone: '555-0123' },
    { id: 9, email: 'conductor9@drivertrack.com', password: '123456', role: 'conductor', name: 'Miguel Torres', avatar: 'MT', vehicleId: 9, email: 'miguel.torres@email.com', phone: '555-4567' },
    { id: 10, email: 'conductor10@drivertrack.com', password: '123456', role: 'conductor', name: 'Elena Ruiz', avatar: 'ER', vehicleId: 10, email: 'elena.ruiz@email.com', phone: '555-8901' },
    { id: 11, email: 'admin@drivertrack.com', password: '123456', role: 'admin', name: 'Administrador', avatar: 'AD' },
    { id: 12, email: 'dueno@drivertrack.com', password: '123456', role: 'dueno', name: 'Dueño', avatar: 'DU' }
  ]);

  // Vehicles data with realistic dates for 2024
  const [vehicles, setVehicles] = useState([
    { 
      id: 1, 
      plate: 'ABC-123', 
      model: 'Toyota Hilux', 
      year: 2020, 
      status: 'active', 
      driver: 'Carlos Méndez', 
      driverId: 1,
      image: 'https://placehold.co/300x200/3b82f6/ffffff?text=Hilux',
      insuranceCompany: 'Seguros Atlas',
      insurancePolicy: 'POL-2024-001',
      insurancePhone: '555-1234',
      weeklyRent: 1700,
      deposit: 1700,
      depositPaid: true
    },
    { 
      id: 2, 
      plate: 'DEF-456', 
      model: 'Nissan Navara', 
      year: 2019, 
      status: 'maintenance', 
      driver: 'Ana López', 
      driverId: 2,
      image: 'https://placehold.co/300x200/10b981/ffffff?text=Navara',
      insuranceCompany: 'Qualitas',
      insurancePolicy: 'POL-2024-002',
      insurancePhone: '555-5678',
      weeklyRent: 1600,
      deposit: 1600,
      depositPaid: false
    },
    { 
      id: 3, 
      plate: 'GHI-789', 
      model: 'Ford Ranger', 
      year: 2021, 
      status: 'inactive', 
      driver: 'Pedro Gómez', 
      driverId: 3,
      image: 'https://placehold.co/300x200/f59e0b/ffffff?text=Ranger',
      insuranceCompany: 'Mapfre',
      insurancePolicy: 'POL-2024-003',
      insurancePhone: '555-9012',
      weeklyRent: 1800,
      deposit: 1800,
      depositPaid: true
    },
    { 
      id: 4, 
      plate: 'JKL-012', 
      model: 'Chevrolet Silverado', 
      year: 2020, 
      status: 'active', 
      driver: 'María Rodríguez', 
      driverId: 4,
      image: 'https://placehold.co/300x200/ef4444/ffffff?text=Silverado',
      insuranceCompany: 'AXA',
      insurancePolicy: 'POL-2024-004',
      insurancePhone: '555-3456',
      weeklyRent: 1900,
      deposit: 1900,
      depositPaid: false
    },
    { 
      id: 5, 
      plate: 'MNO-345', 
      model: 'RAM 1500', 
      year: 2022, 
      status: 'active', 
      driver: 'José Hernández', 
      driverId: 5,
      image: 'https://placehold.co/300x200/8b5cf6/ffffff?text=RAM',
      insuranceCompany: 'GNP',
      insurancePolicy: 'POL-2024-005',
      insurancePhone: '555-7890',
      weeklyRent: 2000,
      deposit: 2000,
      depositPaid: true
    },
    { 
      id: 6, 
      plate: 'PQR-678', 
      model: 'Toyota Tacoma', 
      year: 2019, 
      status: 'maintenance', 
      driver: 'Laura Sánchez', 
      driverId: 6,
      image: 'https://placehold.co/300x200/06b6d4/ffffff?text=Tacoma',
      insuranceCompany: 'Chubb',
      insurancePolicy: 'POL-2024-006',
      insurancePhone: '555-2345',
      weeklyRent: 1500,
      deposit: 1500,
      depositPaid: true
    },
    { 
      id: 7, 
      plate: 'STU-901', 
      model: 'Nissan Frontier', 
      year: 2021, 
      status: 'active', 
      driver: 'Roberto Díaz', 
      driverId: 7,
      image: 'https://placehold.co/300x200/10b981/ffffff?text=Frontier',
      insuranceCompany: 'Seguros Banorte',
      insurancePolicy: 'POL-2024-007',
      insurancePhone: '555-6789',
      weeklyRent: 1600,
      deposit: 1600,
      depositPaid: false
    },
    { 
      id: 8, 
      plate: 'VWX-234', 
      model: 'Ford F-150', 
      year: 2020, 
      status: 'active', 
      driver: 'Sofía Martínez', 
      driverId: 8,
      image: 'https://placehold.co/300x200/f97316/ffffff?text=F-150',
      insuranceCompany: 'Seguros Monterrey',
      insurancePolicy: 'POL-2024-008',
      insurancePhone: '555-0123',
      weeklyRent: 1800,
      deposit: 1800,
      depositPaid: true
    },
    { 
      id: 9, 
      plate: 'YZA-567', 
      model: 'Chevrolet Colorado', 
      year: 2019, 
      status: 'inactive', 
      driver: 'Miguel Torres', 
      driverId: 9,
      image: 'https://placehold.co/300x200/8b5cf6/ffffff?text=Colorado',
      insuranceCompany: 'Zurich',
      insurancePolicy: 'POL-2024-009',
      insurancePhone: '555-4567',
      weeklyRent: 1700,
      deposit: 1700,
      depositPaid: true
    },
    { 
      id: 10, 
      plate: 'BCD-890', 
      model: 'RAM 2500', 
      year: 2022, 
      status: 'active', 
      driver: 'Elena Ruiz', 
      driverId: 10,
      image: 'https://placehold.co/300x200/ef4444/ffffff?text=RAM+2500',
      insuranceCompany: 'Seguros Atlas',
      insurancePolicy: 'POL-2024-010',
      insurancePhone: '555-8901',
      weeklyRent: 2100,
      deposit: 2100,
      depositPaid: false
    }
  ]);

  // Weekly accounts data with realistic dates
  const [weeklyAccounts, setWeeklyAccounts] = useState([
    { id: 1, driverId: 1, driver: 'Carlos Méndez', income: 5200, rent: 1700, expenses: 800, balance: 2700, previousDebt: -1200, total: 1500, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 2, driverId: 2, driver: 'Ana López', income: 4800, rent: 1600, expenses: 500, balance: 2700, previousDebt: 0, total: 2700, status: 'paid', paymentEvidence: null, week: '2024-05-20' },
    { id: 3, driverId: 3, driver: 'Pedro Gómez', income: 5500, rent: 1800, expenses: 1200, balance: 2500, previousDebt: -800, total: 1700, status: 'partial', paymentEvidence: null, week: '2024-05-20' },
    { id: 4, driverId: 4, driver: 'María Rodríguez', income: 5100, rent: 1900, expenses: 300, balance: 2900, previousDebt: -500, total: 2400, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 5, driverId: 5, driver: 'José Hernández', income: 5800, rent: 2000, expenses: 600, balance: 3200, previousDebt: 0, total: 3200, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 6, driverId: 6, driver: 'Laura Sánchez', income: 4500, rent: 1500, expenses: 400, balance: 2600, previousDebt: -300, total: 2300, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 7, driverId: 7, driver: 'Roberto Díaz', income: 5300, rent: 1600, expenses: 700, balance: 2700, previousDebt: -1000, total: 1700, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 8, driverId: 8, driver: 'Sofía Martínez', income: 5600, rent: 1800, expenses: 900, balance: 2900, previousDebt: 0, total: 2900, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 9, driverId: 9, driver: 'Miguel Torres', income: 4900, rent: 1700, expenses: 200, balance: 3000, previousDebt: -600, total: 2400, status: 'pending', paymentEvidence: null, week: '2024-05-20' },
    { id: 10, driverId: 10, driver: 'Elena Ruiz', income: 6000, rent: 2100, expenses: 1000, balance: 2900, previousDebt: -1500, total: 1400, status: 'pending', paymentEvidence: null, week: '2024-05-20' }
  ]);

  // Maintenance tasks with realistic dates for 2024
  const [maintenanceTasks, setMaintenanceTasks] = useState([
    { id: 1, vehicleId: 1, vehicle: 'ABC-123', task: 'Cambio de aceite', dueDate: '2024-06-15', priority: 'high', assignedTo: 'Carlos Méndez' },
    { id: 2, vehicleId: 2, vehicle: 'DEF-456', task: 'Revisión de frenos', dueDate: '2024-06-20', priority: 'medium', assignedTo: 'Ana López' },
    { id: 3, vehicleId: 3, vehicle: 'GHI-789', task: 'Alineación y balanceo', dueDate: '2024-07-01', priority: 'low', assignedTo: 'Pedro Gómez' },
    { id: 4, vehicleId: 1, vehicle: 'ABC-123', task: 'Revisión de llantas', dueDate: '2024-06-10', priority: 'medium', assignedTo: 'Carlos Méndez' },
    { id: 5, vehicleId: 2, vehicle: 'DEF-456', task: 'Cambio de filtros', dueDate: '2024-06-18', priority: 'low', assignedTo: 'Ana López' },
    { id: 6, vehicleId: 4, vehicle: 'JKL-012', task: 'Cambio de aceite', dueDate: '2024-06-25', priority: 'high', assignedTo: 'María Rodríguez' },
    { id: 7, vehicleId: 5, vehicle: 'MNO-345', task: 'Revisión general', dueDate: '2024-07-05', priority: 'medium', assignedTo: 'José Hernández' },
    { id: 8, vehicleId: 6, vehicle: 'PQR-678', task: 'Reparación de suspensión', dueDate: '2024-06-30', priority: 'high', assignedTo: 'Laura Sánchez' },
    { id: 9, vehicleId: 7, vehicle: 'STU-901', task: 'Cambio de batería', dueDate: '2024-07-10', priority: 'low', assignedTo: 'Roberto Díaz' },
    { id: 10, vehicleId: 8, vehicle: 'VWX-234', task: 'Revisión de motor', dueDate: '2024-07-15', priority: 'medium', assignedTo: 'Sofía Martínez' },
    { id: 11, vehicleId: 9, vehicle: 'YZA-567', task: 'Cambio de aceite', dueDate: '2024-06-22', priority: 'high', assignedTo: 'Miguel Torres' },
    { id: 12, vehicleId: 10, vehicle: 'BCD-890', task: 'Revisión de frenos', dueDate: '2024-06-28', priority: 'medium', assignedTo: 'Elena Ruiz' }
  ]);

  // Tickets with realistic dates
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      driverId: 1,
      driver: 'Carlos Méndez', 
      type: 'Mecánico', 
      severity: 'high', 
      description: 'Aire acondicionado no funciona', 
      status: 'pending', 
      date: '2024-05-20',
      ticketId: 'TKT-2024-001',
      updates: [
        { date: '2024-05-20', status: 'Pendiente', message: 'Ticket creado' }
      ]
    },
    { 
      id: 2, 
      driverId: 2,
      driver: 'Ana López', 
      type: 'Eléctrico', 
      severity: 'medium', 
      description: 'Falla en luces traseras', 
      status: 'in-progress', 
      date: '2024-05-19',
      ticketId: 'TKT-2024-002',
      updates: [
        { date: '2024-05-19', status: 'Pendiente', message: 'Ticket creado' },
        { date: '2024-05-20', status: 'En progreso', message: 'En diagnóstico' }
      ]
    },
    { 
      id: 3, 
      driverId: 3,
      driver: 'Pedro Gómez', 
      type: 'Otro', 
      severity: 'low', 
      description: 'Reparación de llantas', 
      status: 'resolved', 
      date: '2024-05-18',
      ticketId: 'TKT-2024-003',
      updates: [
        { date: '2024-05-18', status: 'Pendiente', message: 'Ticket creado' },
        { date: '2024-05-19', status: 'En progreso', message: 'En espera de refacciones' },
        { date: '2024-05-20', status: 'Resuelto', message: 'Reparación completada' }
      ]
    },
    { 
      id: 4, 
      driverId: 4,
      driver: 'María Rodríguez', 
      type: 'Mecánico', 
      severity: 'high', 
      description: 'Problemas con transmisión', 
      status: 'pending', 
      date: '2024-05-21',
      ticketId: 'TKT-2024-004',
      updates: [
        { date: '2024-05-21', status: 'Pendiente', message: 'Ticket creado' }
      ]
    },
    { 
      id: 5, 
      driverId: 5,
      driver: 'José Hernández', 
      type: 'Eléctrico', 
      severity: 'medium', 
      description: 'Radio no funciona', 
      status: 'pending', 
      date: '2024-05-22',
      ticketId: 'TKT-2024-005',
      updates: [
        { date: '2024-05-22', status: 'Pendiente', message: 'Ticket creado' }
      ]
    }
  ]);

  // Deductions with realistic dates
  const [deductions, setDeductions] = useState([
    { 
      id: 1, 
      driverId: 1,
      driver: 'Carlos Méndez', 
      amount: 1500, 
      reason: 'Llantas', 
      status: 'approved', 
      date: '2024-05-15',
      receipt: null
    },
    { 
      id: 2, 
      driverId: 1,
      driver: 'Carlos Méndez', 
      amount: 800, 
      reason: 'Mantenimiento', 
      status: 'pending', 
      date: '2024-05-20',
      receipt: null
    },
    { 
      id: 3, 
      driverId: 2,
      driver: 'Ana López', 
      amount: 1200, 
      reason: 'Combustible', 
      status: 'pending', 
      date: '2024-05-18',
      receipt: null
    },
    { 
      id: 4, 
      driverId: 4,
      driver: 'María Rodríguez', 
      amount: 900, 
      reason: 'Mantenimiento', 
      status: 'approved', 
      date: '2024-05-12',
      receipt: null
    }
  ]);

  // Notifications with realistic dates
  const [notifications, setNotifications] = useState([
    { id: 1, userId: 1, type: 'maintenance', message: 'Tu próximo cambio de aceite es en 200 km', date: '2024-05-20', read: false },
    { id: 2, userId: 1, type: 'deduction', message: 'Deducción aprobada: -$150 por combustible', date: '2024-05-19', read: true },
    { id: 3, userId: 2, type: 'ticket', message: 'Ticket TKT-2024-002 actualizado a "En progreso"', date: '2024-05-18', read: false },
    { id: 4, userId: 1, type: 'account', message: 'Tu cuenta semanal ha sido generada: $1,500', date: '2024-05-17', read: false },
    { id: 5, userId: 3, type: 'maintenance', message: 'Tu vehículo necesita alineación y balanceo', date: '2024-05-21', read: false }
  ]);

  // Messages with realistic dates
  const [messages, setMessages] = useState([
    { id: 1, from: 'Administrador', to: 'Todos', message: 'Recordatorio: Cierre de cuentas semanales este lunes', date: '2024-05-17', image: null },
    { id: 2, from: 'Dueño', to: 'Carlos Méndez', message: 'Buen trabajo esta semana, sigue así', date: '2024-05-20', image: null }
  ]);

  // Handle user login
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  // Handle user logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };

  // Calendar utility functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  // Get maintenance tasks for a specific date
  const getMaintenanceForDate = (date) => {
    const dateStr = formatDate(date);
    if (currentUser?.role === 'conductor') {
      return maintenanceTasks.filter(task => 
        task.dueDate === dateStr && task.vehicleId === currentUser.vehicleId
      );
    }
    return maintenanceTasks.filter(task => task.dueDate === dateStr);
  };

  // Handle deduction submission
  const handleDeductionSubmit = (e) => {
    e.preventDefault();
    const newDeduction = {
      id: deductions.length + 1,
      driverId: currentUser.id,
      driver: currentUser.name,
      amount: parseFloat(deductionForm.amount),
      reason: deductionForm.reason === 'other' ? deductionForm.otherReason : deductionForm.reason,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      receipt: deductionForm.receipt
    };
    setDeductions([...deductions, newDeduction]);
    setDeductionForm({ amount: '', reason: '', otherReason: '', receipt: null });
    
    // Add notification for admin
    const newNotification = {
      id: notifications.length + 1,
      userId: 11, // admin user id
      type: 'deduction',
      message: `Nueva solicitud de deducción de $${newDeduction.amount} por ${newDeduction.reason} de ${currentUser.name}`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setNotifications([...notifications, newNotification]);
    alert('Solicitud de deducción enviada correctamente');
  };

  // Handle ticket submission
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      driverId: currentUser.id,
      driver: currentUser.name,
      type: ticketForm.type,
      severity: ticketForm.severity,
      description: ticketForm.description,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      ticketId: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      updates: [
        { date: new Date().toISOString().split('T')[0], status: 'Pendiente', message: 'Ticket creado' }
      ]
    };
    setTickets([...tickets, newTicket]);
    setTicketForm({ type: '', severity: 'medium', description: '' });
    
    // Add notification for admin
    const newNotification = {
      id: notifications.length + 1,
      userId: 11, // admin user id
      type: 'ticket',
      message: `Nuevo ticket creado: ${newTicket.ticketId} por ${currentUser.name}`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setNotifications([...notifications, newNotification]);
    alert('Ticket creado correctamente');
  };

  // Handle message submission
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      id: messages.length + 1,
      from: currentUser.name,
      to: messageForm.recipients.length > 0 ? messageForm.recipients.map(id => users.find(u => u.id === id)?.name).join(', ') : 'Todos',
      message: messageForm.message,
      date: new Date().toISOString().split('T')[0],
      image: messageForm.image
    };
    setMessages([...messages, newMessage]);
    setMessageForm({ recipients: [], message: '', image: null });
    
    // Add notifications for recipients
    if (messageForm.recipients.length > 0) {
      messageForm.recipients.forEach(recipientId => {
        const newNotification = {
          id: notifications.length + 1,
          userId: recipientId,
          type: 'message',
          message: `Nuevo mensaje de ${currentUser.name}: ${messageForm.message.substring(0, 50)}...`,
          date: new Date().toISOString().split('T')[0],
          read: false
        };
        setNotifications(prev => [...prev, newNotification]);
      });
    } else {
      // Send to all conductors
      users.filter(u => u.role === 'conductor').forEach(conductor => {
        const newNotification = {
          id: notifications.length + 1,
          userId: conductor.id,
          type: 'message',
          message: `Nuevo mensaje de ${currentUser.name}: ${messageForm.message.substring(0, 50)}...`,
          date: new Date().toISOString().split('T')[0],
          read: false
        };
        setNotifications(prev => [...prev, newNotification]);
      });
    }
    
    alert('Mensaje enviado correctamente');
  };

  // Handle payment submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const updatedAccounts = weeklyAccounts.map(account => 
      account.id === paymentForm.accountId 
        ? { ...account, status: 'pending', paymentEvidence: paymentForm.evidence }
        : account
    );
    setWeeklyAccounts(updatedAccounts);
    setPaymentForm({ accountId: null, evidence: null });
    
    // Add notification for admin
    const account = weeklyAccounts.find(a => a.id === paymentForm.accountId);
    if (account) {
      const newNotification = {
        id: notifications.length + 1,
        userId: 11, // admin user id
        type: 'payment',
        message: `Nuevo comprobante de pago de ${account.driver}: $${account.total}`,
        date: new Date().toISOString().split('T')[0],
        read: false
      };
      setNotifications([...notifications, newNotification]);
    }
    
    alert('Comprobante de pago enviado correctamente');
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Perfil actualizado correctamente');
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? {...n, read: true} : n
    ));
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsOpen && !event.target.closest('.notifications-container')) {
        setNotificationsOpen(false);
      }
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen, userMenuOpen]);

  // Login Page Component
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (handleLogin(email, password)) {
        setError('');
      } else {
        setError('Credenciales inválidas');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">DriverTrack</h1>
            <p className="text-blue-200">Sistema de Gestión de Flotilla</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Correo Electrónico</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@empresa.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Contraseña</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-blue-300 font-medium mb-2">Credenciales de prueba:</h3>
            <div className="text-sm text-blue-200 space-y-1">
              <p><strong>Conductores:</strong> conductor1@drivertrack.com / 123456</p>
              <p><strong>Administrador:</strong> admin@drivertrack.com / 123456</p>
              <p><strong>Dueño:</strong> dueno@drivertrack.com / 123456</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              ¿Problemas para acceder? <a href="#" className="text-blue-300 hover:text-white underline">Contacta al administrador</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component
  const Sidebar = () => {
    // Define menu items based on user role
    const menuItems = {
      conductor: [
        { icon: Home, label: 'Dashboard', id: 'dashboard' },
        { icon: Car, label: 'Mi Vehículo', id: 'my-vehicle' },
        { icon: Wallet, label: 'Mi Cuenta', id: 'account' },
        { icon: Wrench, label: 'Mantenimiento', id: 'maintenance' },
        { icon: Calendar, label: 'Calendario', id: 'calendar' },
        { icon: Ticket, label: 'Reportar Problema', id: 'tickets' }
      ],
      admin: [
        { icon: Home, label: 'Dashboard', id: 'dashboard' },
        { icon: Car, label: 'Vehículos', id: 'vehicles' },
        { icon: Users, label: 'Conductores', id: 'drivers' },
        { icon: Wallet, label: 'Cuentas Semanales', id: 'accounts' },
        { icon: Wrench, label: 'Mantenimiento', id: 'maintenance' },
        { icon: Calendar, label: 'Calendario', id: 'calendar' },
        { icon: Ticket, label: 'Mesa de Soluciones', id: 'tickets' },
        { icon: MessageCircle, label: 'Enviar Mensaje', id: 'messages' },
        { icon: FileText, label: 'Reportes', id: 'reports' }
      ],
      dueno: [
        { icon: Home, label: 'Dashboard', id: 'dashboard' },
        { icon: Car, label: 'Vehículos', id: 'vehicles' },
        { icon: Users, label: 'Conductores', id: 'drivers' },
        { icon: Wallet, label: 'Cuentas Semanales', id: 'accounts' },
        { icon: Wrench, label: 'Mantenimiento', id: 'maintenance' },
        { icon: Calendar, label: 'Calendario', id: 'calendar' },
        { icon: Ticket, label: 'Mesa de Soluciones', id: 'tickets' },
        { icon: MessageCircle, label: 'Enviar Mensaje', id: 'messages' },
        { icon: FileText, label: 'Reportes', id: 'reports' },
        { icon: Settings, label: 'Configuración', id: 'settings' }
      ]
    };

    const items = menuItems[currentUser?.role] || [];

    return (
      <>
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">DriverTrack</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 px-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  // User Menu Component
  const UserMenu = () => {
    if (!userMenuOpen) return null;

    return (
      <div className="user-menu-container absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser?.avatar}
            </div>
            <div>
              <p className="text-white font-medium">{currentUser?.name}</p>
              <p className="text-slate-400 text-sm capitalize">
                {currentUser?.role === 'conductor' ? 'Conductor' : 
                 currentUser?.role === 'admin' ? 'Administrador' : 'Dueño'}
              </p>
            </div>
          </div>
        </div>
        <div className="py-2">
          <button
            onClick={() => {
              setCurrentPage('profile');
              setUserMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Mi Perfil</span>
          </button>
          {currentUser?.role === 'dueno' && (
            <button
              onClick={() => {
                setCurrentPage('settings');
                setUserMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
          )}
          <hr className="border-slate-700 my-2" />
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    );
  };

  // Notifications Component
  const NotificationsMenu = () => {
    if (!notificationsOpen) return null;

    // Filter notifications for current user
    const userNotifications = notifications.filter(n => 
      n.userId === currentUser?.id || 
      (currentUser?.role === 'admin' && (n.userId === 11 || n.type === 'deduction' || n.type === 'ticket' || n.type === 'payment')) ||
      (currentUser?.role === 'dueno' && n.userId === 12)
    );

    return (
      <div className="notifications-container absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-white font-medium">Notificaciones</h3>
          <button 
            onClick={() => setNotificationsOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {userNotifications.length > 0 ? (
            userNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer ${
                  !notification.read ? 'bg-slate-700/30' : ''
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'maintenance' ? 'bg-yellow-500' :
                    notification.type === 'deduction' ? 'bg-green-500' :
                    notification.type === 'ticket' ? 'bg-blue-500' :
                    notification.type === 'account' ? 'bg-purple-500' :
                    notification.type === 'payment' ? 'bg-indigo-500' :
                    'bg-indigo-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{notification.message}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      {new Date(notification.date).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2" />
              <p>No hay notificaciones</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Dashboard Component
  const Dashboard = () => {
    // Define dashboard statistics based on user role
    const stats = {
      conductor: [
        { title: 'Saldo Semanal', value: '$2,700', change: '+12%', icon: Wallet, color: 'bg-green-500' },
        { title: 'Próximo Mantenimiento', value: '200 km', change: 'Cambio de aceite', icon: Wrench, color: 'bg-blue-500' },
        { title: 'Estado del Vehículo', value: 'Activo', change: 'Toyota Hilux ABC-123', icon: Car, color: 'bg-purple-500' }
      ],
      admin: [
        { title: 'Vehículos Activos', value: '24', change: '+2 este mes', icon: Car, color: 'bg-blue-500' },
        { title: 'Solicitudes Pendientes', value: '8', change: '3 urgentes', icon: FileText, color: 'bg-yellow-500' },
        { title: 'Ingresos del Mes', value: '$125,400', change: '+15% vs mes anterior', icon: BarChart3, color: 'bg-green-500' }
      ],
      dueno: [
        { title: 'Flotilla Total', value: '32', change: '24 activos', icon: Car, color: 'bg-blue-500' },
        { title: 'Utilidad Mensual', value: '$45,200', change: '+18% vs mes anterior', icon: BarChart3, color: 'bg-green-500' },
        { title: 'Tickets Abiertos', value: '3', change: '1 urgente', icon: Ticket, color: 'bg-red-500' }
      ]
    };

    const userStats = stats[currentUser?.role] || [];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Bienvenido, {currentUser?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentUser?.role === 'conductor' && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Alertas Importantes</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-white font-medium">Mantenimiento requerido</p>
                  <p className="text-slate-400 text-sm">Tu próximo cambio de aceite es en 200 km</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-white font-medium">Seguro vence pronto</p>
                  <p className="text-slate-400 text-sm">Tu seguro vence en 15 días</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentUser?.role === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Estado de Vehículos</h2>
              <div className="space-y-4">
                {vehicles.slice(0, 5).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center space-x-4">
                    <img src={vehicle.image} alt={vehicle.model} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-white font-medium">{vehicle.plate}</p>
                      <p className="text-slate-400 text-sm">{vehicle.model} ({vehicle.year})</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      vehicle.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {vehicle.status === 'active' ? 'Activo' : 
                       vehicle.status === 'maintenance' ? 'Mantenimiento' : 'Inactivo'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Solicitudes Pendientes</h2>
              <div className="space-y-4">
                {tickets.filter(t => t.status === 'pending').slice(0, 3).map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{ticket.driver}</p>
                      <p className="text-slate-400 text-sm">{ticket.description}</p>
                    </div>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                      Pendiente
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // My Vehicle Component (Conductor only)
  const MyVehicle = () => {
    const userVehicle = vehicles.find(v => v.id === currentUser.vehicleId);
    const vehicleMaintenance = maintenanceTasks.filter(t => t.vehicleId === currentUser.vehicleId);

    if (!userVehicle) {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Mi Vehículo</h1>
            <p className="text-slate-400">No tienes un vehículo asignado actualmente</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <Car className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">Contacta al administrador para que te asigne un vehículo</p>
          </div>
        </div>
      );
    }

    const userAccount = weeklyAccounts.find(a => a.driverId === currentUser.id);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Mi Vehículo</h1>
          <p className="text-slate-400">Información detallada de tu vehículo asignado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Información del Vehículo</h2>
            <div className="flex flex-col items-center mb-6">
              <img src={userVehicle.image} alt={userVehicle.model} className="w-full max-w-xs rounded-lg mb-4" />
              <h3 className="text-2xl font-bold text-white">{userVehicle.model}</h3>
              <p className="text-slate-400">{userVehicle.year}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Placa:</span>
                <span className="text-white font-medium">{userVehicle.plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estado:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  userVehicle.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  userVehicle.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {userVehicle.status === 'active' ? 'Activo' : 
                   userVehicle.status === 'maintenance' ? 'Mantenimiento' : 'Inactivo'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Renta Semanal:</span>
                <span className="text-white font-medium">${userVehicle.weeklyRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fianza:</span>
                <span className="text-white font-medium">${userVehicle.deposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fianza Pagada:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  userVehicle.depositPaid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {userVehicle.depositPaid ? 'Sí' : 'No'}
                </span>
              </div>
              {!userVehicle.depositPaid && (
                <div className="flex justify-between border-t border-slate-600 pt-2">
                  <span className="text-slate-400">Fianza Pendiente:</span>
                  <span className="text-white font-medium">${userVehicle.deposit}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Seguro del Vehículo</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Compañía:</span>
                <span className="text-white font-medium">{userVehicle.insuranceCompany}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Póliza:</span>
                <span className="text-white font-medium">{userVehicle.insurancePolicy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Teléfono:</span>
                <span className="text-white font-medium">{userVehicle.insurancePhone}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-4">Estado de Cuenta</h3>
            {userAccount && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cuenta Semanal (Renta)</span>
                  <span className="text-white font-medium">${userAccount.rent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Deducciones</span>
                  <span className="text-white font-medium">-${userAccount.expenses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Adeudo Anterior</span>
                  <span className="text-white font-medium">
                    {userAccount.previousDebt < 0 ? `-$${Math.abs(userAccount.previousDebt)}` : '$0'}
                  </span>
                </div>
                {!userVehicle.depositPaid && (
                  <div className="flex justify-between border-t border-slate-600 pt-2">
                    <span className="text-slate-400">Fianza Pendiente</span>
                    <span className="text-white font-medium">${userVehicle.deposit}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-600 pt-2">
                  <span className="text-slate-300 font-medium">Total a Pagar</span>
                  <span className="text-white font-bold text-lg">
                    ${userAccount.total + (userVehicle.depositPaid ? 0 : userVehicle.deposit)}
                  </span>
                </div>
                {userAccount.status !== 'paid' && (
                  <button 
                    onClick={() => {
                      setPaymentForm({ accountId: userAccount.id, evidence: null });
                      setCurrentPage('payment');
                    }}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Pagar Cuenta
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Mantenimientos Programados</h2>
          {vehicleMaintenance.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicleMaintenance.map((task) => (
                <div key={task.id} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{task.task}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority === 'high' ? 'Alta' : 
                       task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">Fecha: {task.dueDate}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Wrench className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p>No hay mantenimientos programados para tu vehículo</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Drivers Component
  const Drivers = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Conductores</h1>
            <p className="text-slate-400">Administra los conductores de tu flotilla</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuevo Conductor</span>
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar conductores..."
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-medium">Conductor</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Vehículo</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Teléfono</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Estado</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.role === 'conductor').map((driver) => {
                  const vehicle = vehicles.find(v => v.driverId === driver.id);
                  return (
                    <tr key={driver.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {driver.avatar}
                          </div>
                          <div>
                            <p className="text-white font-medium">{driver.name}</p>
                            <p className="text-slate-400 text-sm">{driver.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{vehicle ? `${vehicle.plate} - ${vehicle.model}` : 'Sin vehículo'}</td>
                      <td className="p-4 text-slate-300">{driver.phone || 'N/A'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vehicle ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {vehicle ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Account Component
  const Account = () => {
    const userDeductions = deductions.filter(d => d.driverId === currentUser.id);
    const userAccount = weeklyAccounts.find(a => a.driverId === currentUser.id);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Mi Cuenta</h1>
          <p className="text-slate-400">Gestiona tus finanzas y solicitudes</p>
        </div>

        {userAccount && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Estado de Cuenta Semanal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Renta Semanal</p>
                <p className="text-2xl font-bold text-red-400">-${userAccount.rent.toLocaleString()}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Gastos</p>
                <p className="text-2xl font-bold text-red-400">-${userAccount.expenses.toLocaleString()}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Adeudo Anterior</p>
                <p className="text-2xl font-bold text-red-400">
                  {userAccount.previousDebt < 0 ? `-$${Math.abs(userAccount.previousDebt).toLocaleString()}` : '$0'}
                </p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Saldo</p>
                <p className="text-2xl font-bold text-blue-400">${userAccount.balance.toLocaleString()}</p>
              </div>
            </div>
            <div className="border-t border-slate-600 pt-4">
              <p className="text-slate-300">Total a pagar: <span className="text-white font-bold text-xl">${userAccount.total.toLocaleString()}</span></p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Solicitar Deducción</h2>
            <form onSubmit={handleDeductionSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Monto a deducir</label>
                <input
                  type="number"
                  value={deductionForm.amount}
                  onChange={(e) => setDeductionForm({...deductionForm, amount: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm mb-2">Motivo</label>
                <select
                  value={deductionForm.reason}
                  onChange={(e) => setDeductionForm({...deductionForm, reason: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar motivo</option>
                  <option value="combustible">Combustible</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              {deductionForm.reason === 'otros' && (
                <div>
                  <label className="block text-slate-300 text-sm mb-2">Especificar otro motivo</label>
                  <input
                    type="text"
                    value={deductionForm.otherReason}
                    onChange={(e) => setDeductionForm({...deductionForm, otherReason: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Especificar motivo"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-300 text-sm mb-2">Adjuntar comprobante (opcional)</label>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors">
                    <Paperclip className="w-4 h-4 mr-2" />
                    <span>Seleccionar archivo</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setDeductionForm({...deductionForm, receipt: e.target.files[0]})}
                      accept="image/*,.pdf"
                    />
                  </label>
                  {deductionForm.receipt && (
                    <span className="text-slate-400 text-sm">{deductionForm.receipt.name}</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Solicitud
              </button>
            </form>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Mis Deducciones</h2>
            <div className="space-y-3">
              {userDeductions.length > 0 ? (
                userDeductions.map((deduction) => (
                  <div key={deduction.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">${deduction.amount.toLocaleString()}</span>
                        <span className="text-slate-400 text-sm">({deduction.reason})</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">{deduction.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      deduction.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      deduction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {deduction.status === 'approved' ? 'Aprobada' : 
                       deduction.status === 'pending' ? 'Pendiente' : 'Rechazada'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Wallet className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p>No tienes solicitudes de deducción</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vehicles Component
  const Vehicles = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Vehículos</h1>
            <p className="text-slate-400">Administra tu flotilla de vehículos</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuevo Vehículo</span>
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar vehículos..."
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-medium">Vehículo</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Placa</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Conductor</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Estado</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={vehicle.image} alt={vehicle.model} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-white font-medium">{vehicle.model}</p>
                          <p className="text-slate-400 text-sm">{vehicle.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white font-medium">{vehicle.plate}</td>
                    <td className="p-4 text-slate-300">{vehicle.driver}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        vehicle.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {vehicle.status === 'active' ? 'Activo' : 
                         vehicle.status === 'maintenance' ? 'Mantenimiento' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Accounts Component
  const Accounts = () => {
    const pendingDeductions = deductions.filter(d => d.status === 'pending');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Cuentas Semanales</h1>
            <p className="text-slate-400">Gestiona las cuentas de los conductores</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {weeklyAccounts.map((account) => (
            <div key={account.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{account.driver}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  account.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                  account.status === 'partial' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {account.status === 'paid' ? 'Pagado' : 
                   account.status === 'partial' ? 'Parcial' : 'Pendiente'}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ingresos</span>
                  <span className="text-white font-medium">${account.income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Renta Semanal</span>
                  <span className="text-white font-medium">-${account.rent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gastos</span>
                  <span className="text-white font-medium">-${account.expenses.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-600 pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">Saldo Semanal</span>
                    <span className="text-white font-bold">${account.balance.toLocaleString()}</span>
                  </div>
                </div>
                {account.previousDebt < 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Adeudo Anterior</span>
                    <span className="text-red-400 font-medium">${account.previousDebt.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-slate-600 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total a Pagar</span>
                    <span className="text-white font-bold text-lg">${account.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  Marcar como Pagado
                </button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Solicitudes de Deducción Pendientes</h2>
          <div className="space-y-3">
            {pendingDeductions.length > 0 ? (
              pendingDeductions.map((deduction) => (
                <div key={deduction.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">${deduction.amount.toLocaleString()}</span>
                      <span className="text-slate-400 text-sm">({deduction.reason})</span>
                      <span className="text-slate-300 text-sm">por {deduction.driver}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">{deduction.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setViewingDeduction(deduction)}
                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const updatedDeductions = deductions.map(d => 
                          d.id === deduction.id ? {...d, status: 'approved'} : d
                        );
                        setDeductions(updatedDeductions);
                        
                        // Add notification
                        const driver = users.find(u => u.name === deduction.driver);
                        if (driver) {
                          const newNotification = {
                            id: notifications.length + 1,
                            userId: driver.id,
                            type: 'deduction',
                            message: `Deducción aprobada: -$${deduction.amount} por ${deduction.reason}`,
                            date: new Date().toISOString().split('T')[0],
                            read: false
                          };
                          setNotifications([...notifications, newNotification]);
                        }
                        alert('Deducción aprobada');
                      }}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const updatedDeductions = deductions.map(d => 
                          d.id === deduction.id ? {...d, status: 'rejected'} : d
                        );
                        setDeductions(updatedDeductions);
                        
                        // Add notification
                        const driver = users.find(u => u.name === deduction.driver);
                        if (driver) {
                          const newNotification = {
                            id: notifications.length + 1,
                            userId: driver.id,
                            type: 'deduction',
                            message: `Deducción rechazada: ${deduction.reason}`,
                            date: new Date().toISOString().split('T')[0],
                            read: false
                          };
                          setNotifications([...notifications, newNotification]);
                        }
                        alert('Deducción rechazada');
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                <p>No hay solicitudes de deducción pendientes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Maintenance Component
  const Maintenance = () => {
    // Conductors can only see their own vehicle's maintenance
    const userMaintenanceTasks = currentUser?.role === 'conductor' 
      ? maintenanceTasks.filter(task => task.vehicleId === currentUser.vehicleId)
      : maintenanceTasks;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mantenimientos Programados</h1>
            <p className="text-slate-400">Gestiona los servicios de mantenimiento</p>
          </div>
          {currentUser?.role !== 'conductor' && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nuevo Mantenimiento</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userMaintenanceTasks.map((task) => (
            <div key={task.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{task.vehicle}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {task.priority === 'high' ? 'Alta' : 
                   task.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
              <p className="text-slate-300 mb-2">{task.task}</p>
              <p className="text-slate-400 text-sm mb-4">Fecha: {task.dueDate}</p>
              <p className="text-slate-400 text-sm mb-4">Asignado a: {task.assignedTo}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  Programar
                </button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Calendar Component
  const CalendarView = () => {
    const [view, setView] = useState('month'); // month, week, day

    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setCurrentDate(newDate);
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentDate);
      const firstDayOfMonth = getFirstDayOfMonth(currentDate);
      const days = [];

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-24 border border-slate-700"></div>);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const maintenanceTasksForDay = getMaintenanceForDate(date);
        const isToday = isSameDay(date, new Date());

        days.push(
          <div 
            key={day} 
            className={`h-24 border border-slate-700 p-1 cursor-pointer hover:bg-slate-700/50 ${
              isToday ? 'bg-blue-600/20 border-blue-500' : ''
            } ${isSameDay(date, selectedDate) ? 'bg-slate-600' : ''}`}
            onClick={() => setSelectedDate(date)}
          >
            <div className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-slate-300'}`}>
              {day}
            </div>
            <div className="mt-1 space-y-1">
              {maintenanceTasksForDay.slice(0, 2).map((task) => (
                <div 
                  key={task.id} 
                  className={`text-xs p-1 rounded truncate ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {task.task}
                </div>
              ))}
              {maintenanceTasksForDay.length > 2 && (
                <div className="text-xs text-slate-400">
                  +{maintenanceTasksForDay.length - 2} más
                </div>
              )}
            </div>
          </div>
        );
      }

      return days;
    };

    const getDayHeaders = () => {
      const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      return days.map((day, index) => (
        <div key={index} className="p-2 text-center text-slate-400 font-medium border border-slate-700">
          {day}
        </div>
      ));
    };

    const getSelectedDateTasks = () => {
      return getMaintenanceForDate(selectedDate);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Calendario de Mantenimientos</h1>
            <p className="text-slate-400">Programa y gestiona los mantenimientos de tu flotilla</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Hoy
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {currentUser?.role !== 'conductor' && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Nuevo Evento</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white text-center">
              {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
          
          <div className="grid grid-cols-7">
            {getDayHeaders()}
            {renderCalendar()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Mantenimientos para {selectedDate.toLocaleDateString('es-ES')}
            </h3>
            <div className="space-y-3">
              {getSelectedDateTasks().length > 0 ? (
                getSelectedDateTasks().map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {task.priority === 'high' ? 'Alta' : 
                           task.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                        <span className="text-white font-medium">{task.vehicle}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{task.task}</p>
                      <p className="text-slate-400 text-sm mt-1">Asignado a: {task.assignedTo}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-600 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p>No hay mantenimientos programados para esta fecha</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Próximos Mantenimientos</h3>
            <div className="space-y-3">
              {maintenanceTasks
                .filter(task => new Date(task.dueDate) >= new Date())
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium text-sm">{task.vehicle}</span>
                        <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {task.priority === 'high' ? 'Alta' : 
                           task.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1">{task.task}</p>
                      <p className="text-slate-400 text-xs mt-1">{task.dueDate}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tickets Component
  const Tickets = () => {
    const userTickets = currentUser?.role === 'conductor' 
      ? tickets.filter(t => t.driverId === currentUser.id)
      : tickets;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mesa de Soluciones</h1>
            <p className="text-slate-400">Gestiona los reportes de problemas</p>
          </div>
          {currentUser?.role === 'conductor' && (
            <button 
              onClick={() => setCurrentPage('new-ticket')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Ticket</span>
            </button>
          )}
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-medium">Ticket ID</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Conductor</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Tipo</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Problema</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Fecha</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Gravedad</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Estado</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {userTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="p-4 text-white font-medium">{ticket.ticketId}</td>
                    <td className="p-4 text-white font-medium">{ticket.driver}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                        {ticket.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{ticket.description}</td>
                    <td className="p-4 text-slate-400">{ticket.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        ticket.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {ticket.severity === 'high' ? 'Alta' : 
                         ticket.severity === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'pending' ? 'bg-red-500/20 text-red-400' :
                        ticket.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {ticket.status === 'pending' ? 'Pendiente' : 
                         ticket.status === 'in-progress' ? 'En Progreso' : 'Resuelto'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setViewingTicket(ticket)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {currentUser?.role === 'admin' && (
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // New Ticket Component
  const NewTicket = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Reportar Problema</h1>
            <p className="text-slate-400">Crea un nuevo ticket para reportar un problema</p>
          </div>
          <button
            onClick={() => setCurrentPage('tickets')}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Tipo de Problema</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTicketForm({...ticketForm, type: 'Mecánico'})}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    ticketForm.type === 'Mecánico' 
                      ? 'border-blue-500 bg-blue-500/20' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <Wrench className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <span className="text-white">Mecánico</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketForm({...ticketForm, type: 'Eléctrico'})}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    ticketForm.type === 'Eléctrico' 
                      ? 'border-yellow-500 bg-yellow-500/20' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <span className="text-white">Eléctrico</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketForm({...ticketForm, type: 'Otro'})}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    ticketForm.type === 'Otro' 
                      ? 'border-purple-500 bg-purple-500/20' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <span className="text-white">Otro</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Gravedad</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setTicketForm({...ticketForm, severity: 'high'})}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    ticketForm.severity === 'high' 
                      ? 'bg-red-500/20 border border-red-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white">Alta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketForm({...ticketForm, severity: 'medium'})}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    ticketForm.severity === 'medium' 
                      ? 'bg-yellow-500/20 border border-yellow-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-white">Media</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketForm({...ticketForm, severity: 'low'})}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    ticketForm.severity === 'low' 
                      ? 'bg-green-500/20 border border-green-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white">Baja</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Descripción del Problema</label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe detalladamente el problema..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setCurrentPage('tickets')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Messages Component
  const Messages = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Enviar Mensaje</h1>
            <p className="text-slate-400">Envía mensajes a conductores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Nuevo Mensaje</h2>
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">Destinatarios</label>
                  <select
                    multiple
                    value={messageForm.recipients}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                      setMessageForm({...messageForm, recipients: selected});
                    }}
                    className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los conductores</option>
                    {users.filter(u => u.role === 'conductor').map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                  <p className="text-slate-400 text-xs mt-1">Mantén presionado Ctrl para seleccionar múltiples destinatarios</p>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm mb-2">Mensaje</label>
                  <textarea
                    value={messageForm.message}
                    onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                    className="w-full h-24 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm mb-2">Imagen (opcional)</label>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors">
                      <Paperclip className="w-4 h-4 mr-2" />
                      <span>Seleccionar imagen</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setMessageForm({...messageForm, image: e.target.files[0]})}
                        accept="image/*"
                      />
                    </label>
                    {messageForm.image && (
                      <span className="text-slate-400 text-sm">{messageForm.image.name}</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Mensajes Recientes</h2>
              <div className="space-y-3">
                {messages.slice(0, 5).map((message) => (
                  <div key={message.id} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium text-sm">{message.from}</span>
                      <span className="text-slate-400 text-xs">{message.date}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{message.message}</p>
                    {message.to !== 'Todos' && (
                      <p className="text-slate-400 text-xs mt-1">Para: {message.to}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Profile Component
  const Profile = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
          <p className="text-slate-400">Gestiona tu información personal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {currentUser?.avatar}
                </div>
                <h3 className="text-xl font-semibold text-white">{currentUser?.name}</h3>
                <p className="text-slate-400 capitalize">
                  {currentUser?.role === 'conductor' ? 'Conductor' : 
                   currentUser?.role === 'admin' ? 'Administrador' : 'Dueño'}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-6">Información Personal</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Foto de Perfil</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                        <UserCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        <Camera className="w-4 h-4 inline mr-2" />
                        Cambiar Foto
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Número de Teléfono</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="555-1234"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Número de Seguro Social</label>
                    <input
                      type="text"
                      value={profileData.socialSecurity}
                      onChange={(e) => setProfileData({...profileData, socialSecurity: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="NSS"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-300 text-sm mb-2">Dirección</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dirección completa"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-300 text-sm mb-2">Foto de Licencia de Conducir</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                        <IdCard className="w-8 h-8 text-slate-400" />
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        <Camera className="w-4 h-4 inline mr-2" />
                        Subir Licencia
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Reports Component
  const Reports = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Reportes</h1>
            <p className="text-slate-400">Genera informes detallados de tu flotilla</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Generar Reporte</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Cuentas Semanales</h3>
            </div>
            <p className="text-slate-400 mb-4">Reporte detallado de ingresos y gastos por conductor</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Generar
            </button>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <Car className="w-8 h-8 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Historial de Vehículos</h3>
            </div>
            <p className="text-slate-400 mb-4">Historial completo de mantenimientos y uso por vehículo</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Generar
            </button>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Análisis Financiero</h3>
            </div>
            <p className="text-slate-400 mb-4">Análisis de ingresos, gastos y utilidades mensuales</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Generar
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Filtros de Reporte</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Tipo de Reporte</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Cuentas Semanales</option>
                <option>Historial de Vehículos</option>
                <option>Análisis Financiero</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Fecha Inicio</label>
              <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Fecha Fin</label>
              <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Payment Component
  const Payment = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Pagar Cuenta</h1>
            <p className="text-slate-400">Sube tu comprobante de pago</p>
          </div>
          <button
            onClick={() => setCurrentPage('my-vehicle')}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Comprobante de Pago</label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors">
                  <Paperclip className="w-4 h-4 mr-2" />
                  <span>Seleccionar archivo</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setPaymentForm({...paymentForm, evidence: e.target.files[0]})}
                    accept="image/*,.pdf"
                    required
                  />
                </label>
                {paymentForm.evidence && (
                  <span className="text-slate-400 text-sm">{paymentForm.evidence.name}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setCurrentPage('my-vehicle')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Comprobante
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Settings Component (Only for owner)
  const Settings = () => {
    if (currentUser?.role !== 'dueno') {
      return (
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h2>
          <p className="text-slate-400">Solo el dueño puede acceder a la configuración</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          <p className="text-slate-400">Administra la configuración del sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Personalización</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Logo de la Aplicación</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Car className="w-8 h-8 text-slate-400" />
                  </div>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    <Camera className="w-4 h-4 inline mr-2" />
                    Cambiar Logo
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Nombre de la Aplicación</label>
                <input
                  type="text"
                  defaultValue="DriverTrack"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Gestión de Usuarios</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Agregar Nuevo Usuario
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Editar Usuarios Existentes
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                Eliminar Usuarios
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Gestión de Vehículos</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Agregar Nuevo Vehículo
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Editar Vehículos Existentes
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                Eliminar Vehículos
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Rubros y Categorías</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Agregar Nuevo Rubro
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Editar Rubros Existentes
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                Eliminar Rubros
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Deduction Detail Modal
  const DeductionDetailModal = () => {
    if (!viewingDeduction) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Detalle de Deducción</h3>
            <button 
              onClick={() => setViewingDeduction(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Conductor:</span>
              <span className="text-white">{viewingDeduction.driver}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Monto:</span>
              <span className="text-white">${viewingDeduction.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Motivo:</span>
              <span className="text-white">{viewingDeduction.reason}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fecha:</span>
              <span className="text-white">{viewingDeduction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estado:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                viewingDeduction.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                viewingDeduction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {viewingDeduction.status === 'approved' ? 'Aprobada' : 
                 viewingDeduction.status === 'pending' ? 'Pendiente' : 'Rechazada'}
              </span>
            </div>
            
            {viewingDeduction.receipt && (
              <div>
                <span className="text-slate-400 block mb-2">Comprobante:</span>
                <div className="bg-slate-700 rounded-lg p-4 flex items-center justify-center">
                  <FileImage className="w-8 h-8 text-slate-400" />
                  <span className="text-slate-300 ml-2">{viewingDeduction.receipt.name}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setViewingDeduction(null)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Ticket Detail Modal
  const TicketDetailModal = () => {
    if (!viewingTicket) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Detalle del Ticket</h3>
            <button 
              onClick={() => setViewingTicket(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Ticket ID:</span>
              <span className="text-white">{viewingTicket.ticketId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Conductor:</span>
              <span className="text-white">{viewingTicket.driver}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tipo:</span>
              <span className="text-white">{viewingTicket.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gravedad:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                viewingTicket.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                viewingTicket.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {viewingTicket.severity === 'high' ? 'Alta' : 
                 viewingTicket.severity === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fecha:</span>
              <span className="text-white">{viewingTicket.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estado:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                viewingTicket.status === 'pending' ? 'bg-red-500/20 text-red-400' :
                viewingTicket.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {viewingTicket.status === 'pending' ? 'Pendiente' : 
                 viewingTicket.status === 'in-progress' ? 'En Progreso' : 'Resuelto'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-2">Descripción:</span>
              <p className="text-white bg-slate-700/50 p-3 rounded-lg">{viewingTicket.description}</p>
            </div>
            
            <div>
              <span className="text-slate-400 block mb-2">Historial de Actualizaciones:</span>
              <div className="space-y-2">
                {viewingTicket.updates.map((update, index) => (
                  <div key={index} className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{update.status}</span>
                      <span className="text-slate-400 text-sm">{update.date}</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-1">{update.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setViewingTicket(null)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  if (currentPage === 'login') {
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'my-vehicle': return <MyVehicle />;
      case 'account': return <Account />;
      case 'vehicles': return <Vehicles />;
      case 'drivers': return <Drivers />;
      case 'accounts': return <Accounts />;
      case 'maintenance': return <Maintenance />;
      case 'calendar': return <CalendarView />;
      case 'tickets': return <Tickets />;
      case 'new-ticket': return <NewTicket />;
      case 'messages': return <Messages />;
      case 'profile': return <Profile />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      case 'payment': return <Payment />;
      default: return <Dashboard />;
    }
  };

  // Count unread notifications
  const unreadNotifications = notifications.filter(n => 
    !n.read && (
      n.userId === currentUser?.id || 
      (currentUser?.role === 'admin' && (n.userId === 11 || n.type === 'deduction' || n.type === 'ticket' || n.type === 'payment')) ||
      (currentUser?.role === 'dueno' && n.userId === 12)
    )
  ).length;

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-white capitalize">
                {currentPage === 'dashboard' ? 'Dashboard' :
                 currentPage === 'my-vehicle' ? 'Mi Vehículo' :
                 currentPage === 'account' ? 'Mi Cuenta' :
                 currentPage === 'vehicles' ? 'Vehículos' :
                 currentPage === 'drivers' ? 'Conductores' :
                 currentPage === 'accounts' ? 'Cuentas Semanales' :
                 currentPage === 'maintenance' ? 'Mantenimiento' :
                 currentPage === 'calendar' ? 'Calendario' :
                 currentPage === 'tickets' ? 'Mesa de Soluciones' :
                 currentPage === 'new-ticket' ? 'Nuevo Ticket' :
                 currentPage === 'messages' ? 'Enviar Mensaje' :
                 currentPage === 'profile' ? 'Mi Perfil' :
                 currentPage === 'reports' ? 'Reportes' :
                 currentPage === 'settings' ? 'Configuración' :
                 currentPage === 'payment' ? 'Pagar Cuenta' : currentPage}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-slate-400 hover:text-white"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <NotificationsMenu />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser?.avatar}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-white text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-slate-400 text-xs capitalize">
                      {currentUser?.role === 'conductor' ? 'Conductor' : 
                       currentUser?.role === 'admin' ? 'Administrador' : 'Dueño'}
                    </p>
                  </div>
                </button>
                <UserMenu />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderCurrentPage()}
        </main>
      </div>
      
      {/* Modals */}
      <DeductionDetailModal />
      <TicketDetailModal />
    </div>
  );
};

export default App;
