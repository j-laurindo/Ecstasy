import axios from 'axios';

// --- CONFIGURAÇÃO BASE ---

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

const TOKEN_KEY = 'filminis_token';
const ROLE_KEY = 'filminis_role';

// Interceptor: Adiciona o token em TODAS as requisições, exceto login/cadastro
api.interceptors.request.use(config => {
    // Pega o token do armazenamento local
    const token = localStorage.getItem(TOKEN_KEY);

    // Se o token existir, adiciona o cabeçalho 'Authorization'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});


// Interceptor para TRATAMENTO DE ERROS e LOGOUT automático
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Força o logout e limpa o token
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(ROLE_KEY);
            
            // Retorna um erro para que a função chamadora saiba que falhou
            return Promise.reject({ message: 'Sessão expirada ou não autorizada. Faça login novamente.', status: error.response.status });
        }
        return Promise.reject(error);
    }
);


// --- FUNÇÕES DE AUTENTICAÇÃO E USUÁRIO ---
export const authService = {
    login: async (email, senha) => {
        try {
            const response = await api.post('/login', { email, senha });
            const { token, role, id } = response.data;
            
            // Armazena dados de autenticação
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(ROLE_KEY, role);
            
            return { token, role, id };
        } catch (error) {
            // Retorna o erro específico da API ou um erro genérico de conexão
            throw error.response ? error.response.data.error : new Error('Falha na conexão.');
        }
    },

    cadastro: async (email, senha) => {
        try {
            const response = await api.post('/cadastro', { email, senha });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha no cadastro.');
        }
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
    },
    
    getRole: () => localStorage.getItem(ROLE_KEY),
    isLoggedIn: () => !!localStorage.getItem(TOKEN_KEY)
};


// --- FUNÇÕES PÚBLICAS E READ ---
export const filmeService = {
    getFilmes: async () => {
        try {
            const response = await api.get('/filmes');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao carregar a lista de filmes.');
        }
    },

    // --- CRUD ADMIN ---
    createFilmeAdmin: async (data) => {
        try {
            const response = await api.post('/admin/filmes', data);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao cadastrar filme como Admin.');
        }
    },

    updateFilmeAdmin: async (id, data) => {
        try {
            const response = await api.put(`/admin/filmes/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao atualizar filme.');
        }
    },

    deleteFilmeAdmin: async (id) => {
        try {
            const response = await api.delete(`/admin/filmes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao deletar filme.');
        }
    },


    // --- SOLICITAÇÕES USER ---
    solicitarNovoFilme: async (data) => {
        try {
            const response = await api.post('/user/filmes', data);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao solicitar novo filme.');
        }
    },

    solicitarEdicao: async (filmeId, campo, valor) => {
        try {
            const response = await api.post(`/user/filmes/${filmeId}/edicao`, { campo, valor });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao solicitar edição.');
        }
    },
};


// --- FUNÇÕES DE FLUXO DE ADMINISTRAÇÃO ---
export const adminService = {
    getSolicitacoesPendentes: async () => {
        try {
            const response = await api.get('/admin/solicitacoes');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao listar solicitações pendentes.');
        }
    },

    aprovarSolicitacao: async (id, tipo) => {
        try {
            const response = await api.post(`/admin/solicitacoes/${id}/aprovar`, { tipo });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao aprovar solicitação.');
        }
    },

    rejeitarSolicitacao: async (id, tipo) => {
        try {
            const response = await api.post(`/admin/solicitacoes/${id}/rejeitar`, { tipo });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data.error : new Error('Falha ao rejeitar solicitação.');
        }
    },
};

export default api;