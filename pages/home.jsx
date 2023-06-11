import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "@/components/Home";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

const home = () => {
  const { currentAccount, isLoadingAccount } = useUser();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!currentAccount && !isLoadingAccount) {
      router.replace('/'); // Redirect to the sign-in page if no user is logged in
    }
  }, [currentAccount, isLoadingAccount, router]);

  useEffect(() => {
    if (currentAccount && !isLoadingAccount) {
      setShowContent(true); // Show the content after the redirection is complete
    }
  }, [currentAccount, isLoadingAccount]);

  return (
    <div>
      <AnimatePresence>
        {showContent && currentAccount && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
      {!currentAccount && isLoadingAccount && (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default home;
