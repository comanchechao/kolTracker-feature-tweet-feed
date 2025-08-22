import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import BottomStatusMenu from "../components/BottomStatusMenu";
export interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <Navbar
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <BottomStatusMenu />
    </>
  );
};

export default PageLayout;
