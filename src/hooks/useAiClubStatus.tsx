import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const useAiClubStatus = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsSubscribed(false);
      return;
    }

    const check = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("check-ai-club-subscription");
        if (!error && data?.subscribed) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch {
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [user]);

  return { isSubscribed, loading };
};
