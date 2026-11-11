
import express from 'express';

import livrosRoutes from './routes/livros.js';
import leitoresRoutes from './routes/leitores.js';
import emprestimosRoutes from './routes/emprestimos.js';
import devolucoesRoutes from './routes/devolucoes.js';
import funcionariosRoutes from './routes/funcionarios.js';
import authRoutes from './routes/auth.js';

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
app.use('/funcionarios', funcionariosRoutes);
app.use('/auth', authRoutes);

export default app;
