
import { sessoes } from '../data/store.js';

// Verificar se o funcionário está autenticado
export function autenticar(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !sessoes.has(token)) {
    return res.status(401).json({
      mensagem: 'Acesso não autorizado. Faça login.'
    });
  }

  const sessao = sessoes.get(token);

  // Encerrar sessão após 15 minutos de inatividade
  if (Date.now() - sessao.ultimaAtividade > 15 * 60 * 1000) {
    sessoes.delete(token);

    return res.status(401).json({
      mensagem: 'Sessão expirada. Faça login novamente.'
    });
  }

  sessao.ultimaAtividade = Date.now();
  req.funcionario = sessao;

  next();
}

// Verificar se o perfil pode executar a operação
export function autorizar(...perfis) {
  return (req, res, next) => {
    if (!perfis.includes(req.funcionario.perfil)) {
      return res.status(403).json({
        mensagem: 'Você não tem permissão para realizar esta operação.'
      });
    }

    next();
  };
}
