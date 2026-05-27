import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper to auto-increment the date by 1 day
const getNextDayStr = (lastDateStr) => {
  const d = new Date(lastDateStr);
  if (isNaN(d.getTime())) return new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
};

const getEmptyPage = (lastDateStr) => {
  return {
    date: getNextDayStr(lastDateStr),
    time: "08:00 AM",
    mainTask: "",
    topTasks: ["", "", ""],
    habits: ["", "", "", ""],
    breakthroughs: ["", ""],
    productiveScore: "",
    mainWins: ["", "", ""],
    stateReflection: "",
  };
};

const KayapalatJournal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const initialDate = new Date();
  const [pages, setPages] = useState([{
    date: initialDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase(),
    time: initialDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    mainTask: "Finalize presentation and send proposal.",
    topTasks: ["Present proposal to new client.", "Write three blog posts.", "Evening run workout."],
    habits: ["Workout", "Meditate", "Hydrate", "Deep Work"],
    breakthroughs: ["Increase focus on priority #1.", "Maintain a constant positive state."],
    productiveScore: "8/10",
    mainWins: ["Proposal submitted.", "Ran 5km.", "Good morning focus."],
    stateReflection: "Managed state well, felt energetic and focused for deep work tasks.",
  }]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipState, setFlipState] = useState(null); 

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [showModal]);

  const openJournal = () => {
    setShowModal(true);
    setTimeout(() => setIsOpen(true), 350);
  };

  const closeJournal = () => {
    setIsOpen(false);
    setTimeout(() => setShowModal(false), 1000);
  };

  const turnNext = () => {
    if (flipState) return;
    let nextIndex = currentIndex + 1;
    let newPages = [...pages];
    
    if (nextIndex >= pages.length) {
      newPages.push(getEmptyPage(pages[currentIndex].date));
      setPages(newPages);
    }
    
    setFlipState({ direction: 'next', from: currentIndex, to: nextIndex });
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setFlipState(null);
    }, 850); 
  };

  const turnPrev = () => {
    if (flipState || currentIndex === 0) return;
    let prevIndex = currentIndex - 1;
    
    setFlipState({ direction: 'prev', from: currentIndex, to: prevIndex });
    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setFlipState(null);
    }, 850);
  };

  const turnMobile = (direction) => {
    if (flipState) return;
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (direction === 'next' && newIndex >= pages.length) {
      setPages([...pages, getEmptyPage(pages[currentIndex].date)]);
    }
    
    setFlipState({ direction });
    setCurrentIndex(newIndex);
    setTimeout(() => setFlipState(null), 400);
  };

  const handleChange = (e, field, pageIndex) => {
    const updatedPages = [...pages];
    updatedPages[pageIndex] = { ...updatedPages[pageIndex], [field]: e.target.value };
    setPages(updatedPages);
  };

  const handleArrayChange = (e, field, arrIndex, pageIndex) => {
    const updatedPages = [...pages];
    const newArray = [...updatedPages[pageIndex][field]];
    newArray[arrIndex] = e.target.value;
    updatedPages[pageIndex] = { ...updatedPages[pageIndex], [field]: newArray };
    setPages(updatedPages);
  };

  const mobileVariants = {
    enter: (direction) => ({ x: direction === 'next' ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction === 'next' ? -100 : 100, opacity: 0 })
  };

  // Renderers apply "no-scrollbar" to overflow areas
  const renderLeftPage = (pageIndex, isReadOnly = false, isMobile = false) => {
    const data = pages[pageIndex];
    if (!data) return null;
    return (
      <div className={`flex flex-col text-gray-800 relative z-10 space-y-4 ${isMobile ? "p-5 pb-6" : "p-8 pt-12 h-full overflow-y-auto no-scrollbar"}`}>
        <div className="text-center mb-2">
          <h3 className="text-gray-400 font-semibold tracking-widest text-[13px] mb-2">KAYAPALAT DAILY PLAN</h3>
          <div className="flex justify-center items-center gap-4 text-gray-500 text-xs">
            <input type="text" readOnly={isReadOnly} value={data.date} onChange={(e) => handleChange(e, 'date', pageIndex)} className="bg-transparent border-b border-gray-200 text-center w-28 outline-none focus:border-[#ff6a3d]" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-[13px] mb-1 text-gray-900">Main Task for the day:</h4>
          <input type="text" readOnly={isReadOnly} value={data.mainTask} onChange={(e) => handleChange(e, 'mainTask', pageIndex)} className="w-full bg-transparent border-b border-gray-300 text-sm italic font-serif outline-none focus:border-[#ff6a3d] py-1" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-[13px] mb-2 text-gray-900">TOP 3 TASKS & PROJECTS:</h4>
          <div className="space-y-3">
            {data.topTasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="w-4">{idx + 1}.</span>
                <input type="text" readOnly={isReadOnly} value={task} onChange={(e) => handleArrayChange(e, 'topTasks', idx, pageIndex)} className="bg-transparent border-b border-gray-200 w-full outline-none focus:border-[#ff6a3d]" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-[13px] mb-2 text-gray-900">BREAKTHROUGHS TO ACHIEVE:</h4>
          <div className="space-y-3">
            {data.breakthroughs.map((breakthrough, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a3d] flex-shrink-0"></span>
                <input type="text" readOnly={isReadOnly} value={breakthrough} onChange={(e) => handleArrayChange(e, 'breakthroughs', idx, pageIndex)} className="bg-transparent border-b border-gray-200 w-full outline-none focus:border-[#ff6a3d]" />
              </div>
            ))}
          </div>
        </div>
        
        {!isReadOnly && !isMobile && (
          <div className="absolute bottom-6 left-8 flex items-center z-40">
            <button 
              onClick={turnPrev} disabled={pageIndex === 0}
              className={`text-xs font-bold tracking-wider transition-colors flex items-center gap-1 group ${pageIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#d4af37] hover:text-[#ff6a3d] cursor-pointer'}`}
            >
              <span className={`text-lg leading-none transition-transform ${pageIndex !== 0 && "group-hover:-translate-x-1"}`}>‹</span> PREV
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderRightPage = (pageIndex, isReadOnly = false, isMobile = false) => {
    const data = pages[pageIndex];
    if (!data) return null;
    return (
      <div className={`flex flex-col text-gray-800 space-y-4 ${isMobile ? "p-5 pt-6 bg-gray-50/50" : "p-8 h-full overflow-y-auto no-scrollbar"}`}>
        <h3 className={`text-gray-400 font-semibold tracking-widest text-[13px] mb-2 ${isMobile ? "text-center" : "text-right"}`}>MY DAILY REVIEW</h3>
        <div>
          <h4 className="font-bold text-[13px] mb-1 text-gray-900">How productive did I feel today?</h4>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm italic font-serif">Score:</span>
            <input type="text" readOnly={isReadOnly} value={data.productiveScore} onChange={(e) => handleChange(e, 'productiveScore', pageIndex)} className="bg-transparent border-b border-gray-300 text-sm italic font-serif outline-none focus:border-[#ff6a3d] w-16" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-[13px] mb-2 text-gray-900">What were my main wins today?</h4>
          <div className="space-y-3">
            {data.mainWins.map((win, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="w-4">{idx + 1}.</span>
                <input type="text" readOnly={isReadOnly} value={win} onChange={(e) => handleArrayChange(e, 'mainWins', idx, pageIndex)} className="bg-transparent border-b border-gray-200 w-full outline-none focus:border-[#ff6a3d]" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-[13px] mb-2 text-gray-900">How well did I manage my state?</h4>
          <textarea readOnly={isReadOnly} value={data.stateReflection} onChange={(e) => handleChange(e, 'stateReflection', pageIndex)} className="w-full bg-transparent border border-gray-200 rounded p-2 text-sm leading-relaxed outline-none focus:border-[#ff6a3d] resize-none h-24 no-scrollbar" />
        </div>
        
        {!isReadOnly && !isMobile && (
          <div className="absolute bottom-6 right-8 flex items-center justify-between w-[calc(100%-4rem)]">
            <span className="text-gray-400/80 text-[11px] font-semibold tracking-[0.2em] pointer-events-none">PAGE {pageIndex + 1}</span>
            <button 
              onClick={turnNext}
              className="text-[#d4af37] text-xs font-bold tracking-wider hover:text-[#ff6a3d] transition-colors flex items-center gap-1 z-40 cursor-pointer group"
            >
              {pageIndex === pages.length - 1 ? 'NEW DAY' : 'NEXT'} <span className="text-lg leading-none transition-transform group-hover:translate-x-1">›</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const staticLeftIndex = flipState ? (flipState.direction === 'next' ? flipState.from : flipState.to) : currentIndex;
  const staticRightIndex = flipState ? (flipState.direction === 'next' ? flipState.to : flipState.from) : currentIndex;
  const flippingFrontIndex = flipState?.direction === 'next' ? flipState.from : flipState?.to;
  const flippingBackIndex = flipState?.direction === 'next' ? flipState.to : flipState?.from;

  const CoverDesign = ({ hintText }) => (
    <div className="absolute inset-0 [backface-visibility:hidden] bg-[#141414] rounded-r-2xl rounded-l-md shadow-2xl border-l-[12px] border-[#0a0a0a] border-y border-r border-gray-800 p-8 flex flex-col justify-between overflow-hidden group">
      <div className="absolute top-4 right-4 bottom-4 left-4 border border-[#d4af37]/30 rounded-lg pointer-events-none"></div>
      <div className="absolute top-6 right-6 w-3 h-3 bg-[#d4af37]/50 rounded-sm"></div>
      <div className="absolute top-6 left-6 w-3 h-3 bg-[#d4af37]/50 rounded-sm"></div>
      <div className="absolute bottom-6 right-6 w-3 h-3 bg-[#d4af37]/50 rounded-sm"></div>
      <div className="absolute bottom-6 left-6 w-3 h-3 bg-[#d4af37]/50 rounded-sm"></div>

      <div className="relative z-10 flex flex-col h-full justify-center items-center mt-[-40px]">
        <div className="flex items-center justify-center gap-2 mb-16">
          <span className="text-[#ffffff] font-serif text-xl">*</span>
          <span className="text-[#ffff]/80 font-medium tracking-widest text-xs uppercase">Kayapalat</span>
        </div>
        <h2 className="text-[3.5rem] leading-none font-serif text-[#d4af37] text-center mb-6 tracking-wide" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
          KP<br />JOURNAL
        </h2>
        <div className="w-16 h-[2px] bg-[#d4af37]/50 mx-auto"></div>
      </div>
      
      <div className="text-center space-y-3 relative z-10 pb-4">
        <p className="text-[#d4af37]/80 text-sm tracking-wide">Your Daily Discipline System</p>
        <p className="text-[#d4af37]/50 text-xs italic font-serif">by - Ajay Sethi</p>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center text-white text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
        {hintText}
      </div>
    </div>
  );

  return (
    <>
      {/* GLOBAL CSS INJECTION TO KILL SCROLLBARS EVERYWHERE */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />

      <div className="relative w-full h-[550px] flex items-center justify-center [perspective:1500px] z-10">
        <div onClick={openJournal} className="relative w-[380px] h-[520px] cursor-pointer transition-transform duration-700 ease-out -rotate-y-[15deg] rotate-z-[2deg] hover:rotate-y-0 hover:rotate-z-0 hover:-translate-y-2 [transform-style:preserve-3d]">
          <CoverDesign hintText="Click to Open Journal" />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm md:p-4 overflow-hidden">
            <div className="absolute inset-0 cursor-default" onClick={closeJournal}></div>
            
            <button onClick={closeJournal} className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-[#ff6a3d] text-lg md:text-xl font-bold z-[110] transition-colors bg-black/50 md:bg-transparent px-3 py-1 rounded-full md:rounded-none">✕</button>

            {/* MOBILE APP-LIKE SLIDING UI */}
            <div className="flex md:hidden flex-col w-full h-full bg-[#0a0a0a] relative z-50 overflow-hidden">
              <div className="pt-12 pb-4 text-center shrink-0 z-10 bg-gradient-to-b from-[#0a0a0a] to-transparent">
                 <h2 className="text-2xl font-serif text-[#d4af37] tracking-wide">KP JOURNAL</h2>
                 <p className="text-[#d4af37]/60 text-[10px] tracking-widest uppercase mt-1">Page {currentIndex + 1}</p>
              </div>

              <div className="flex-1 relative w-full overflow-x-hidden">
                <AnimatePresence initial={false} custom={flipState?.direction} mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    custom={flipState?.direction}
                    variants={mobileVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    // Applied the bulletproof CSS class here
                    className="absolute inset-0 w-full h-full overflow-y-auto pb-32 px-4 no-scrollbar"
                  >
                    <div className="bg-[#fcfcfc] rounded-xl shadow-2xl w-full overflow-hidden mb-8 border border-gray-200">
                       {renderLeftPage(currentIndex, false, true)}
                       <div className="w-full h-px bg-gray-200 border-t border-dashed border-gray-300"></div>
                       {renderRightPage(currentIndex, false, true)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex gap-3 pb-8 z-20 pointer-events-none">
                <button 
                  onClick={() => turnMobile('prev')} disabled={currentIndex === 0}
                  className={`pointer-events-auto flex-1 font-bold py-3.5 rounded-lg uppercase tracking-wider text-sm transition-opacity ${currentIndex === 0 ? 'bg-gray-800 text-gray-500' : 'bg-gray-800 text-white active:scale-95'}`}
                >
                  Prev
                </button>
                <button 
                  onClick={() => turnMobile('next')}
                  className="pointer-events-auto flex-[2] bg-[#d4af37] text-black font-bold py-3.5 rounded-lg uppercase tracking-wider text-sm active:scale-95 shadow-[0_4px_14px_0_rgba(212,175,55,0.39)]"
                >
                  {currentIndex === pages.length - 1 ? 'Start New Day' : 'Next Page'}
                </button>
              </div>
            </div>

            {/* DESKTOP 3D FLIPPING UI */}
            <div className="hidden md:flex relative w-full h-[550px] items-center justify-center [perspective:1800px] pointer-events-none">
              <div className={`relative w-[380px] h-[520px] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] pointer-events-auto ${isOpen ? "translate-x-[190px]" : "translate-x-0"}`}>
                
                <div className="absolute inset-0 bg-[#fcfcfc] rounded-r-2xl rounded-l-sm shadow-2xl border-y border-r border-gray-300 z-0 overflow-hidden flex flex-col shadow-[15px_0_30px_-10px_rgba(0,0,0,0.2)_inset]">
                  {renderRightPage(staticRightIndex)}
                </div>

                <AnimatePresence>
                  {flipState && flipState.direction && (
                    <motion.div 
                      key="flipping-page"
                      initial={{ rotateY: flipState.direction === 'next' ? 0 : -180 }}
                      animate={{ rotateY: flipState.direction === 'next' ? -180 : 0 }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.85, ease: [0.64, 0.04, 0.35, 1] }} 
                      className="absolute inset-0 origin-left [transform-style:preserve-3d] z-40 pointer-events-none shadow-2xl"
                    >
                      <div className="absolute inset-0 [backface-visibility:hidden] bg-[#fcfcfc] rounded-r-2xl border-r border-y border-gray-300 shadow-[-15px_0_30px_rgba(0,0,0,0.15)_inset] overflow-hidden">
                        {renderRightPage(flippingFrontIndex, true)}
                        <motion.div animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 0.85 }} className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                      </div>
                      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#fcfcfc] rounded-l-2xl border-l border-y border-gray-300 shadow-[15px_0_30px_rgba(0,0,0,0.15)_inset] overflow-hidden">
                        {renderLeftPage(flippingBackIndex, true)}
                        <motion.div animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 0.85 }} className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`absolute inset-0 origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] z-30 ${isOpen ? "-rotate-y-180" : "rotate-y-0"}`}>
                  <div onClick={() => setIsOpen(true)} className="absolute inset-0 [backface-visibility:hidden] cursor-pointer">
                    <CoverDesign hintText="Click to Flip Open" />
                  </div>
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#fcfcfc] rounded-l-2xl rounded-r-sm border-y border-l border-gray-300 overflow-hidden shadow-[-15px_0_30px_-10px_rgba(0,0,0,0.15)_inset]">
                    {renderLeftPage(staticLeftIndex)}
                    <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KayapalatJournal;