import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onDismiss={() => removeToast(toast.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
