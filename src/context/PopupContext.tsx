import { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  openBook: () => void;
  openRemote: () => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within PopupProvider");
  return ctx;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [showBook, setShowBook] = useState(false);
  const [showRemote, setShowRemote] = useState(false);
  const [bookForm, setBookForm] = useState({ name: "", phone: "", email: "", issue: "" });
  const [bookSent, setBookSent] = useState(false);

  const openBook = () => { setBookSent(false); setShowBook(true); };
  const openRemote = () => setShowRemote(true);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Book a Visit - " + bookForm.name);
    const body = encodeURIComponent(
      `Name: ${bookForm.name}\nPhone: ${bookForm.phone}\nEmail: ${bookForm.email}\n\nIssue:\n${bookForm.issue}`
    );
    window.location.href = `mailto:info@huisbyte.nl?subject=${subject}&body=${body}`;
    setBookSent(true);
  };

  return (
    <PopupContext.Provider value={{ openBook, openRemote }}>
      {children}

      {/* Book a Visit Popup */}
      {showBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setShowBook(false)}>
          <div className="bg-background border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Book a Visit</h2>
              <button onClick={() => setShowBook(false)} className="text-muted-foreground hover:text-foreground transition-colors text-xl">✕</button>
            </div>
            {bookSent ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Request Sent!</h3>
                <p className="text-muted-foreground">We will get back to you as soon as possible to confirm your visit.</p>
                <button className="mt-6 w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium" onClick={() => setShowBook(false)}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                  <input required type="text" placeholder="Jan de Vries" value={bookForm.name}
                    onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label>
                  <input required type="tel" placeholder="+31 6 12 34 56 78" value={bookForm.phone}
                    onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label>
                  <input required type="email" placeholder="jan@example.nl" value={bookForm.email}
                    onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Describe your issue *</label>
                  <textarea required rows={3} placeholder="e.g. My Wi-Fi keeps dropping and my printer is not working..." value={bookForm.issue}
                    onChange={(e) => setBookForm({ ...bookForm, issue: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity">Send Request</button>
                  <button type="button" className="w-full border border-border text-foreground py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors" onClick={() => setShowBook(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Remote Support Popup */}
      {showRemote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setShowRemote(false)}>
          <div className="bg-background border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Remote Support</h2>
              <button onClick={() => setShowRemote(false)} className="text-muted-foreground hover:text-foreground transition-colors text-xl">✕</button>
            </div>
            <p className="text-muted-foreground mb-6">Follow these steps to start a remote support session with HuisByte:</p>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">1</span>
                <span className="text-foreground">Press <kbd className="bg-secondary text-foreground px-2 py-0.5 rounded text-sm font-mono">Windows + Ctrl + Q</kbd> on your keyboard to open Quick Assist.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">2</span>
                <span className="text-foreground">Click <strong>"Get Help"</strong> in the Quick Assist window.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">3</span>
                <span className="text-foreground">Call us at <a href="tel:+31634119547" className="text-primary font-semibold hover:underline">+31 6 34 11 95 47</a> and we will give you the 6-digit code to enter.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">4</span>
                <span className="text-foreground">Enter the code and we are connected — ready to help you!</span>
              </li>
            </ol>
            <div className="mt-6 flex gap-3">
              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity" onClick={() => window.location.href = "tel:+31634119547"}>Call Us Now</button>
              <button className="w-full border border-border text-foreground py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors" onClick={() => setShowRemote(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};
