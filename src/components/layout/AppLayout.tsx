import { Navbar } from "../Navbar";
import { AuthModal } from "../AuthModal";
import { Footer } from "../Footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer
      

      //   currency={currency}
      //   onCurrencyClick={() => setCurrencyOpen(true)}
      />

      {/* <FilterModal
      // isOpen={isFilterModalOpen}
      // onClose={() => setIsFilterModalOpen(false)}
      // filters={filters}
      // onApply={handleFilterApply}
      // filteredCount={filteredListings.length}
      /> */}

      <AuthModal />

      {/* <CurrencyModal
      // isOpen={currencyOpen}
      // onClose={() => setCurrencyOpen(false)}
      // currency={currency}
      // onCurrencyChange={setCurrency}
      /> */}

      {/* <SideMenu
      // isOpen={sideMenuOpen}
      // isLoggedIn={isLoggedIn}
      // viewMode={viewMode}
      // currency={currency}
      // callbacks={menuCallbacks}
      /> */}
    </div>
  );
};

export default AppLayout;
