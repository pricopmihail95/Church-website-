import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

admin = admin.replace(
  "import { storage, auth } from '../firebase';\nimport { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';",
  "import { storage } from '../firebase';"
);

admin = admin.replace(
  "const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [isRegistering, setIsRegistering] = useState(false);",
  "const [password, setPassword] = useState('');"
);

admin = admin.replace(
  /  useEffect\(\(\) => \{\n    loadData\(\);\n    const unsub = onAuthStateChanged\(auth, \(user\) => \{\n      setIsAuthorized\(!!user\);\n    \}\);\n    return \(\) => unsub\(\);\n  \}, \[\]\);/g,
  "  useEffect(() => {\n    loadData();\n  }, []);"
);

const oldHandleLogin = `  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsAuthorized(true);
      setErrorMsg('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Eroare la autentificare.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthorized(false);
  };`;

const newHandleLogin = `  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = password.trim().toLowerCase();
    // Supporting standard parish nicknames or password for simplicity
    if (cleanPassword === 'scunthorpe' || cleanPassword === 'sfhybald' || cleanPassword === 'parohie') {
      setIsAuthorized(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Parolă incorectă! Încearcă "parohie", "scunthorpe" sau "sfhybald".');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPassword('');
  };`;

admin = admin.replace(oldHandleLogin, newHandleLogin);

const oldForm = `<form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono text-byz-blue-300 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@parohie.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500 rounded-xl px-4 py-3 text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none transition-all duration-300 font-mono tracking-wide mb-4"
                required
              />
              <label className="block text-xs uppercase tracking-widest font-mono text-byz-blue-300 font-semibold mb-2">
                Parolă
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Introdu parola..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500 rounded-xl pl-4 pr-12 py-3 text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none transition-all duration-300 font-mono tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-byz-blue-400 hover:text-byz-blue-200 transition-colors cursor-pointer"
                  title={showPassword ? "Ascunde parola" : "Arată parola"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 border border-red-500/20 p-3 rounded-lg">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                onClick={() => setIsRegistering(false)}
                className="w-full bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,171,21,0.2)] hover:shadow-[0_0_25px_rgba(212,171,21,0.4)]"
              >
                <span>Autentificare</span>
                <Unlock size={16} />
              </button>
              <button
                type="submit"
                onClick={() => setIsRegistering(true)}
                className="w-full bg-byz-blue-800 hover:bg-byz-blue-700 text-gold-400 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm border border-byz-blue-700"
              >
                <span>Creare Cont Nou</span>
              </button>
            </div>
          </form>`;

const newForm = `<form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono text-byz-blue-300 font-semibold mb-2">
                Parolă Acces (De ex. parohie)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Introdu parola..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-byz-blue-950/80 border border-byz-blue-800 focus:border-gold-500 rounded-xl pl-4 pr-12 py-3 text-byz-blue-100 placeholder-byz-blue-600/50 focus:outline-none transition-all duration-300 font-mono text-center tracking-widest"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-byz-blue-400 hover:text-byz-blue-200 transition-colors cursor-pointer"
                  title={showPassword ? "Ascunde parola" : "Arată parola"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/40 border border-red-500/20 p-3 rounded-lg">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-byz-blue-950 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,171,21,0.2)] hover:shadow-[0_0_25px_rgba(212,171,21,0.4)]"
            >
              <span>Autentificare</span>
              <Unlock size={16} />
            </button>
          </form>`;

admin = admin.replace(oldForm, newForm);

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
