const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const anchor = `            {/* GALLERY MANAGEMENT SECTION */}`;

const patronUi = `            {/* PATRON SAINT SECTION */}
            <section className="dark:bg-byz-blue-900 bg-stone-900 shadow-xl dark:bg-byz-blue-900/40 border border-stone-800 dark:border-byz-blue-900/60 p-6 sm:p-8 rounded-3xl shadow-md mt-8">
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsPatronSaintOpen(!isPatronSaintOpen)}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gold-500/10 text-gold-400 dark:text-gold-400 border border-gold-500/20 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-gold-400 dark:text-gold-400">Patron Saint</h2>
                      <p className="font-serif text-xs dark:text-byz-blue-300 text-stone-300 italic">Manage the Patron Saint icon and info link</p>
                    </div>
                  </div>
                  <div className="text-gold-400 dark:text-gold-400">
                    {isPatronSaintOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isPatronSaintOpen && (
                  <div className="mt-8 space-y-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-gold-400 dark:text-gold-400 uppercase tracking-widest mb-2">
                        Icon / Image URL
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={patronSaint.imageUrl}
                          onChange={(e) => setPatronSaint({ ...patronSaint, imageUrl: e.target.value })}
                          className="flex-1 dark:bg-byz-blue-950 bg-stone-800 border dark:border-byz-blue-800 border-stone-700 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm dark:text-byz-blue-100 text-stone-100 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div className="relative mt-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePatronSaintUpload}
                          className="hidden"
                          id="photo-patron-upload"
                        />
                        <label
                          htmlFor="photo-patron-upload"
                          className="flex items-center justify-center w-full dark:bg-byz-blue-900 bg-stone-800/50 hover:dark:bg-byz-blue-800 bg-amber-100/50 border border-byz-blue-700 hover:border-gold-500/50 text-gold-200 py-3 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm space-x-2"
                        >
                          {uploadingPatronSaint ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold-400" />
                          ) : (
                            <>
                              <Upload size={18} />
                              <span>Upload Icon (File)</span>
                            </>
                          )}
                        </label>
                      </div>

                      {patronSaint.imageUrl && (
                        <img src={patronSaint.imageUrl} alt="Patron Saint Preview" className="mt-3 h-24 w-auto object-cover rounded border dark:border-byz-blue-800 border-stone-800 bg-[#3b2f2f]" />
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-gold-400 dark:text-gold-400 uppercase tracking-widest mb-2 mt-6">
                        More Info Link
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Link to saint info"
                          value={patronSaint.moreInfoUrl}
                          onChange={(e) => setPatronSaint({ ...patronSaint, moreInfoUrl: e.target.value })}
                          className="flex-1 dark:bg-byz-blue-950 bg-stone-800 border dark:border-byz-blue-800 border-stone-700 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm dark:text-byz-blue-100 text-stone-100 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSavePatronSaint}
                          className="bg-gold-500 hover:bg-gold-400 text-byz-blue-950 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap shadow-md"
                        >
                          Save Link & Data
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </section>

`;

content = content.replace(anchor, patronUi + anchor);
fs.writeFileSync('src/components/AdminPanel.tsx', content);
