
import express from 'express';

import livrosRoutes from './routes/livros.js';
import leitoresRoutes from './routes/leitores.js';
import emprestimosRoutes from './routes/emprestimos.js';
import devolucoesRoutes from './routes/devolucoes.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Rotas do sistema
app.use('/livros', livrosRoutes);
app.use('/leitores', leitoresRoutes);
app.use('/emprestimos', emprestimosRoutes);
app.use('/devolucoes', devolucoesRoutes);

export default app;
