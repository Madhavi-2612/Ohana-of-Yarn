import { useState, useEffect } from 'react';
import { getReviews, updateReviewStatus, deleteReview } from '../../services/api';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineTrash, HiStar } from 'react-icons/hi';
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await getReviews({ isAdmin: 'true' });
      setReviews(data);
    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApprove = async (id) => {
    try {
      await updateReviewStatus(id);
      setReviews(reviews.map(r => r._id === id ? { ...r, isApproved: !r.isApproved } : r));
      toast.success('Review status updated');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(id);
      setReviews(reviews.filter(r => r._id !== id));
      toast.success('Review deleted');
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Manage <span className="text-gradient">Reviews</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Moderation center for customer feedback</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="card p-6 flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    review.isApproved 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {review.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="font-display font-bold text-gray-800 dark:text-gray-100">
                  {review.name} <span className="text-sm font-normal text-gray-500">from {review.place}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 italic">"{review.message}"</p>
                <p className="text-xs text-gray-400 mt-4">Submitted on: {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleToggleApprove(review._id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold transition-all ${
                    review.isApproved
                      ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {review.isApproved ? (
                    <><HiOutlineXCircle className="w-5 h-5" /> Unapprove</>
                  ) : (
                    <><HiOutlineCheckCircle className="w-5 h-5" /> Approve</>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  title="Delete Review"
                >
                  <HiOutlineTrash className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 card">
          <p className="text-gray-500">No reviews found in the database.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
