import { createRoot } from 'react-dom/client';

import App from './app';

const root = createRoot(document.getElementById('todoapp-root'));
root.render(<App />);
