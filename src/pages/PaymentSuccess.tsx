import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // If not logged in, redirect to auth with a return-to-dashboard param
    if (!user) {
      navigate("/auth?redirect=tartalmaim", { replace: true });
    } else {
      navigate("/tartalmaim", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default PaymentSuccess;
