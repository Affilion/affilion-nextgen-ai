import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center hyper-glass p-12 rounded-2xl max-w-md"
      >
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">Sikeres fizetés! 🎉</h1>
        <p className="text-muted-foreground mb-6">
          Köszönjük a vásárlást! A számlát e-mailben küldjük el neked.
          A megvásárolt tartalmakat a fiókodon keresztül érheted el.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate("/")} className="neon-button border-0">
            Vissza a főoldalra
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
