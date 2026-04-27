import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlinePlusCircle, HiOutlineCog } from 'react-icons/hi';

const AdminDashboard = () => {
  const cards = [
    {
      to: '/admin/products',
      icon: HiOutlineShoppingBag,
      title: 'Manage Products',
      desc: 'Add, edit, or delete products',
      color: 'from-primary-400 to-primary-600',
    },
    {
      to: '/admin/orders',
      icon: HiOutlineClipboardList,
      title: 'Manage Orders',
      desc: 'View and update order statuses',
      color: 'from-lavender-400 to-lavender-500',
    },
    {
      to: '/admin/products/new',
      icon: HiOutlinePlusCircle,
      title: 'Add Product',
      desc: 'Create a new product listing',
      color: 'from-sage-400 to-sage-600',
    },
    {
      to: '/admin/reviews',
      icon: HiOutlineClipboardList,
      title: 'Manage Reviews',
      desc: 'Approve or delete customer reviews',
      color: 'from-amber-400 to-amber-500',
    },
    {
      to: '/admin/settings',
      icon: HiOutlineCog,
      title: 'Admin Settings',
      desc: 'Update profile and security',
      color: 'from-rose-400 to-rose-500',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
        Admin <span className="text-gradient">Dashboard</span>
      </h1>
      <p className="text-gray-500 mb-8">Manage Ohana of Yarn</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group relative overflow-hidden rounded-2xl p-6 text-white transition-all hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="relative z-10">
              <card.icon className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="font-display font-bold text-xl">{card.title}</h3>
              <p className="text-white/80 text-sm mt-1">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
